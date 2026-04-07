import crypto from "crypto";
import { config } from "../../config/config";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// generate otp
export const generateOTP = (): number => {
  return crypto.randomInt(1000, 9999);
};

// hash otp
export const hashOTP = (data: string): string => {
  if (!config.hashingSecret) {
    throw new Error("Hashing secret is not defined");
  }

  return crypto
    .createHmac("sha256", config.hashingSecret)
    .update(data)
    .digest("hex");
};

// verify otp
export const verifyOTP = (hashedOTP: string, data: string): boolean => {
  const newHashedOTP = hashOTP(data);
  return newHashedOTP === hashedOTP;
};

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// send otp email
export const sendOTPEmail = async (email: string, otp: number) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "bookMyScreen",
      link: "https://github.com/AshutoshGaud",
      logo: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751475322/zu4fnmh2jljzbtey77ah.png",
    },
  });

  const emailBody = {
    body: {
      name: email,
      intro: "Welcome to bookMyScreen! We're excited to have you onboard.",
      action: {
        instructions: "Use the OTP below to verify your account:",
        button: {
          color: "#323232",
          text: `${otp}`,
          link: "#",
        },
      },
      outro:
        "This OTP will expire in 2 minutes. If you didn’t request it, please ignore this email.",
    },
  };

  const emailHtml = mailGenerator.generate(emailBody);

  const message = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Your OTP for bookMyScreen",
    html: emailHtml,
  };

  const info = await transporter.sendMail(message);
  return info.messageId;
};
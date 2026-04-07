import { Request, Response, NextFunction } from "express";
import * as OtpService from "./otp.service";
import * as UserService from "../user/user.service";
import * as TokenService from "./token.service";
import createHttpError from "http-errors";
import { isValidEmail } from "../../utils";

// SEND OTP
export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new createHttpError.BadRequest("Email is required"));
    }

    if (!isValidEmail(email)) {
      return next(new createHttpError.BadRequest("Invalid email format"));
    }

    const otp = OtpService.generateOTP();

    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;
    const data = `${email}.${otp}.${expires}`;
    const hashedOTP = OtpService.hashOTP(data);

    await OtpService.sendOTPEmail(email, otp);

    res.status(200).json({
      hash: `${hashedOTP}.${expires}`,
      email,
      msg: "OTP sent successfully!",
    });

  } catch (error) {
    next(error);
  }
};

// VERIFY OTP
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp, hash } = req.body;

    if (!email || !otp || !hash) {
      return next(new createHttpError.BadRequest("All fields are required"));
    }

    const [hashedOTP, expires] = hash.split(".");

    if (Date.now() > Number(expires)) {
      return next(new createHttpError.Gone("OTP expired"));
    }

    const data = `${email}.${otp}.${expires}`;
    const isValid = OtpService.verifyOTP(hashedOTP, data);

    if (!isValid) {
      return next(new createHttpError.Unauthorized("Invalid OTP"));
    }

    let user = await UserService.getUserByEmail(email);

    if (!user) {
      user = await UserService.createUser({ email } as any);
    }

    if (!user || !user._id) {
      return next(new createHttpError.InternalServerError("User creation failed"));
    }

    const { accessToken, refreshToken } = TokenService.generateToken({
      _id: user._id.toString(),
      email: user.email,
    });

    await TokenService.storeRefreshToken(user._id.toString(), refreshToken);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      auth: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await TokenService.deleteRefreshToken(refreshToken);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      msg: "Logged out successfully",
    });

  } catch (error) {
    next(error);
  }
};
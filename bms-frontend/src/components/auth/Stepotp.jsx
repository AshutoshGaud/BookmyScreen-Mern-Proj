import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useCountdown } from "../../hooks/useCountdown";

const StepOtp = ({ onNext }) => {
  const [otpArray, setOtpArray] = useState(new Array(4).fill(""));
  const inputRef = useRef([]);

  const { displayTime, isExpired } = useCountdown({
    initialTimeInSeconds: 2 * 60,
  });

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    console.log("Resend OTP");
  };

  // ✅ FIXED FUNCTION
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    // auto focus next
    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">
        Enter the code we just mailed you
      </h2>

      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* OTP INPUT */}
      <div className="flex items-center justify-center">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => (inputRef.current[index] = el)}
            onChange={(e) => handleOtpChange(e, index)}
            className="w-12 h-12 font-bold text-center rounded-md mx-1 border border-gray-200 outline-none"
          />
        ))}

        <button
          type="button"
          className="w-8 h-8 ml-1 border border-gray-200 text-[#f74565] font-bold rounded-md"
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* TIMER */}
      {isExpired ? (
        <p className="text-center text-sm text-indigo-500">
          OTP expired. please{" "}
          <a href="#" className="underline" onClick={handleResendOtp}>
            resend OTP
          </a>
        </p>
      ) : (
        <p className="text-center text-sm">
          OTP expires in {displayTime}
        </p>
      )}

      <button
        type="button"
        onClick={handleVerifyOtp}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Continue
      </button>

      <p className="text-[#c4c5c5] text-center m-auto text-[12px]">
        By entering your email id, you're agreeing to our{" "}
        <a href="#" className="text-[#f74565]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#f74565]">
          Privacy Policy
        </a>
        . Thanks!
      </p>
    </div>
  );
};

export default StepOtp;
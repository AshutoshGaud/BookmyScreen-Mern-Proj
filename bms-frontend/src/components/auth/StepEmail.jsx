import React, { useState } from "react";

const StepEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    onNext(); // ✅ move to next step
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">
        Enter Your Email
      </h2>

      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      <div className="flex items-center border rounded-md border-gray-300 px-4 py-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your email"
          className="flex-grow outline-none text-base"
          required
        />
      </div>

      <button
        type="button"
        onClick={handleSendOtp}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default StepEmail;
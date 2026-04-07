import { useState } from "react";

const StepAccountCreate = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // ✅ fixed

  const handleActivateAccount = (e) => {
    e.preventDefault();
    console.log(name, phone);
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">
        Enter Your Account Details
      </h2>

      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* Name Input */}
      <div className="flex items-center border rounded-md border-gray-300 px-4 py-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="flex-grow outline-none text-base"
          required
        />
      </div>

      {/* Phone Input */}
      <div className="flex items-center border rounded-md border-gray-300 px-4 py-3">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone"
          className="flex-grow outline-none text-base"
          required
        />
      </div>

      <button
        type="button"
        onClick={handleActivateAccount}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Create Account
      </button>

      <p className="text-[#c4c5c5] text-center m-auto text-[12px]">
        By entering your details, you're agreeing to our{" "}
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

export default StepAccountCreate;
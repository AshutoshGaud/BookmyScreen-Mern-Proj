import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ import add karo

const StepAccountCreate = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ hook hamesha component ke andar
  const { activateUserRequest } = useAuth();

  const handleActivateAccount = (e) => {
    e.preventDefault();

    if (!name || !phone) return;

    activateUserRequest(
      {
        name,
        phone,
      },
      () => {
        console.log("Account created");
      }
    );
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">
        Enter Your Account Details
      </h2>

      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      <div className="flex items-center border rounded-md border-gray-300 px-4 py-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="flex-grow outline-none text-base"
        />
      </div>

      <div className="flex items-center border rounded-md border-gray-300 px-4 py-3">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone"
          className="flex-grow outline-none text-base"
        />
      </div>

      <button
        type="button"
        onClick={handleActivateAccount}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Create Account
      </button>
    </div>
  );
};

export default StepAccountCreate;
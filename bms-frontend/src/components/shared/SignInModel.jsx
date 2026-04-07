import React from "react";
import { IoClose } from "react-icons/io5";
import mainWhiteLogo from "../../assets/main-icon-white.png";
import { useAuth } from "../../context/AuthContext";

// steps
import StepEmail from "../auth/StepEmail";
import StepOtp from "../auth/StepOtp";
import StepAccountCreate from "../auth/StepAccountCreate";

const SignInModal = () => {
  const { step, setStep, showModal, toggleModal } = useAuth();

  const steps = {
    1: StepEmail,
    2: StepOtp,
    3: StepAccountCreate,
  };

  const StepComponent = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] h-[620px] max-w-xl bg-white rounded-3xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-[#f74565] text-white px-6 py-8 h-[260px] relative flex flex-col justify-center items-center">
          
          <IoClose
            onClick={toggleModal}
            className="absolute top-4 right-4 text-3xl cursor-pointer"
          />

          <img src={mainWhiteLogo} alt="logo" className="h-20 mb-2" />

          <p className="text-sm opacity-90">
            Where movies meet magic.
          </p>
        </div>

        {/* Step Content */}
        <div className="p-4">
          {StepComponent && <StepComponent onNext={onNext} />}
        </div>

      </div>
    </div>
  );
};

export default SignInModal;
import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendOTP, verifyOTP, activate } from "../apis";
import { toast } from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [email, setEmail] = useState("");
  const [hash, setHash] = useState("");

  // ✅ SEND OTP
  const sendOtpMutation = useMutation({
    mutationFn: (email) => sendOTP({ email }),
  });

  // ✅ VERIFY OTP
  const verifyOtpMutation = useMutation({
    mutationFn: (data) => verifyOTP(data),
  });

  // ✅ ACTIVATE USER (ONLY ONCE)
  const activateMutation = useMutation({
    mutationFn: (data) => activate(data),
  });

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    if (step !== 1) setStep(1);
  };

  // 🔥 SEND OTP
  const sendOtpRequest = (email, onNext) => {
    sendOtpMutation.mutate(email, {
      onSuccess: (res) => {
        setAuthData(res.data);
        setHash(res.data?.hash);
        setEmail(email);
        toast.success("OTP sent");
        onNext && onNext();
      },
      onError: () => toast.error("OTP failed"),
    });
  };

  // 🔥 VERIFY OTP
  const verifyOtpRequest = (otp, onNext) => {
    verifyOtpMutation.mutate(
      { email, otp, hash },
      {
        onSuccess: (res) => {
          setAuthData(res.data);

          if (res.data?.user?.activateUser) {
            setUser(res.data.user);
            setShowModal(false);
            toast.success("Login successful");
            return;
          }

          toast.success("OTP verified");
          onNext && onNext();
        },
        onError: () => toast.error("Invalid OTP"),
      }
    );
  };

  // 🔥 ACTIVATE USER (FIXED)
  const activateUserRequest = (name, phone) => {
    if (!authData?.user?._id) {
      toast.error("User not found");
      return;
    }

    activateMutation.mutate(
      {
        id: authData.user._id,
        name,
        phone,
        email,
      },
      {
        onSuccess: (res) => {
          setUser(res.data.user);
          setShowModal(false);
          toast.success("Account created");
        },
        onError: (err) => {
          console.log(err);
          toast.error("Activation failed");
        },
      }
    );
  };

  // 🔥 LOGOUT
  const logout = () => {
    setUser(null);
    setStep(1);
    setEmail("");
    setHash("");
    setAuthData(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        step,
        setStep,
        showModal,
        toggleModal,
        email,
        setEmail,
        hash,
        user,
        authData,
        sendOtpRequest,
        verifyOtpRequest,
        activateUserRequest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
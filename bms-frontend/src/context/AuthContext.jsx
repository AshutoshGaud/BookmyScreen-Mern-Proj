import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");   // ✅ ADD
  const [hash, setHash] = useState("");     // ✅ ADD

  const toggleModal = () => {
    setShowModal((prev) => !prev);
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
        setHash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
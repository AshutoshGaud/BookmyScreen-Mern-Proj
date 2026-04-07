import { createContext, useContext, useState } from "react";

const SeatContext = createContext();

export const SeatProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatContext.Provider>
  );
};

export const useSeatContext = () => useContext(SeatContext);
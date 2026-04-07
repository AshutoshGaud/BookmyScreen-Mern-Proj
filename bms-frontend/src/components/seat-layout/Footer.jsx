import React from "react";

const Footer = ({ selectedSeats = [] }) => {
  const isSelected = selectedSeats.length > 0;

  return isSelected ? (
    <div className="bg-white py-3 px-6 flex items-center justify-between z-10">
      <p className="text-gray-700 font-medium text-base">
        {selectedSeats.length} Seat Selected
      </p>

      <button className="bg-black cursor-pointer text-white px-6 py-2 rounded-lg font-semibold">
        Proceed
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <p className="text-xs font-bold text-purple-600 tracking-wider">
        SCREEN THIS WAY
      </p>

      <div className="flex gap-4 text-xs mt-3">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border rounded-[4px]"></div>
          <p>Available</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 border rounded-[4px] flex items-center justify-center">
            <small className="-mt-1">x</small>
          </div>
          <p>Occupied</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-600 rounded-[4px]"></div>
          <p>Selected</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
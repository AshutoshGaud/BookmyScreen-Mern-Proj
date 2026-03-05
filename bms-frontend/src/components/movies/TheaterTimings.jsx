 import React, { useState } from "react";
import dayjs from "dayjs";
import { theatres } from "../../utils/constants"; // ✅ changed import

const TheaterTimings = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);

  const formattedDate = selectedDate.format("DD-MM-YY");
  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  return (
    <>
      {/* Date Buttons */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg min-w-[55px] border text-center transition ${
                isSelected
                  ? "bg-black text-white font-bold border-black"
                  : "border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-semibold">{date.format("D")}</span>
              <span className="text-xs">{date.format("ddd")}</span>
              <span className="text-xs uppercase">{date.format("MMM")}</span>
            </button>
          );
        })}
      </div>

      {/* Theater List */}
      <div className="space-y-8 px-4 mb-10">
        {theatres.map((theatre, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 mb-2">
              <img
                src={theatre.img}
                alt="logo"
                className="w-8 h-8 object-contain"
              />
              <div>
                <p className="font-semibold">{theatre.name}</p>
                <p className="text-sm text-gray-500">{theatre.cancellation}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 ml-11">
              {theatre.timings.map((slot, j) => (
                <button
                  key={j}
                  className={`border px-3 py-1 rounded-lg text-sm cursor-pointer ${
                    slot.highlight
                      ? "border-black font-semibold"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {slot.time} — {slot.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="px-2 text-gray-700 text-sm">
        Selected Date: <span className="font-medium">{formattedDate}</span>
      </p>
    </>
  );
};

export default TheaterTimings;

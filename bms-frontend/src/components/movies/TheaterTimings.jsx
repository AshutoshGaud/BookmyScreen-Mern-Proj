import React, { useState } from "react";
import dayjs from "dayjs";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getshowsByMovieAndLocation } from "../../apis/movies";
import { useLocation } from "../../context/LocationContext";

const TheaterTimings = ({ movieId }) => {
  const { location } = useLocation();

  // 🔥 state → city fix
  const city = location === "Maharashtra" ? "mumbai" : location;

  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);

  const formattedDate = selectedDate.format("DD-MM-YYYY");

  const next7days = Array.from({ length: 7 }, (_, i) =>
    today.add(i, "day")
  );

  const {
    data: showData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["show", movieId, city, formattedDate],
    queryFn: () =>
      getshowsByMovieAndLocation(movieId, city, formattedDate),
    placeholderData: keepPreviousData,
  });

  console.log(showData);

  if (isLoading) return <p className="p-4">Loading shows...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error loading shows</p>;

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
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg min-w-[55px] border ${
                isSelected
                  ? "bg-black text-white font-bold border-black"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <span>{date.format("D")}</span>
              <span className="text-xs">{date.format("ddd")}</span>
              <span className="text-xs">{date.format("MMM")}</span>
            </button>
          );
        })}
      </div>

      {/* Theater List */}
      <div className="space-y-8 px-4 mb-10">
        {showData?.length === 0 && (
          <p className="text-center text-gray-500">
            No shows available
          </p>
        )}

        {showData?.map((curr, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 mb-2">
              <img
                src={curr.theatre?.logo}
                alt="logo"
                className="w-8 h-8"
              />

              <div>
                <p className="font-semibold">
                  {curr.theatre?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Allows Cancellation
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 ml-11">
              {curr.shows?.map((slot, j) => (
                <button
                  key={j}
                  className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                >
                  {slot.startTime} — {slot.audioType}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TheaterTimings;
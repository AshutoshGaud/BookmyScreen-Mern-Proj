import React, { useState } from "react";
import dayjs from "dayjs";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getshowsByMovieAndLocation } from "../../apis/movies";
import { useLocation } from "../../context/LocationContext";
import { useNavigate } from "react-router-dom";

const TheaterTimings = ({ movieId }) => {
  const navigate = useNavigate(); // ✅ FIXED
  const { location } = useLocation();

  const state = location || "Maharashtra";

  const today = dayjs("2026-01-15");

  const [selectedDate, setSelectedDate] = useState(today);

  const formattedDate = selectedDate.format("DD-MM-YYYY");

  // ✅ next 7 days
  const next7days = [...Array(7)].map((_, i) =>
    today.add(i, "day")
  );

  const {
    data: showData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["show", movieId, state, formattedDate],
    queryFn: () =>
      getshowsByMovieAndLocation(movieId, state, formattedDate),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p className="p-4">Loading shows...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error loading shows</p>;

  return (
    <>
      {/* Dates */}
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

      {/* Theaters */}
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
                src={curr.theater?.theaterDetails?.logo}
                alt="logo"
                className="w-8 h-8"
              />

              <div>
                <p className="font-semibold">
                  {curr.theater?.theaterDetails?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {curr.theater?.theaterDetails?.location}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 ml-11">
              {curr.theater?.shows?.map((slot, j) => {
                const theaterId = curr.theater.theaterDetails._id;

                // ✅ format movie name for URL
                const movieName = curr.movie.title
                  .toLowerCase()
                  .replace(/[^a-z0-9 ]/g, "")
                  .replace(/\s+/g, "-");

                return (
                  <button
                    key={j}
                    onClick={() =>
                      navigate(
                        `/movies/${movieId}/${movieName}/${state}/theater/${theaterId}/show/${slot._id}/seat-layout`
                      )
                    }
                    className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                  >
                    {slot.startTime} — {slot.audioType}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TheaterTimings;
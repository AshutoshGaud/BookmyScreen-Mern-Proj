import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { getshowsByMovieAndLocation } from "../../apis/movies";
import { useLocation } from "../../context/LocationContext";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);

const TheaterTimings = ({ movieId }) => {
  const navigate = useNavigate();
  const { location } = useLocation();

  // ✅ Backend me Maharashtra hai
  const state = location || "Maharashtra";

  // ✅ Seeded date
  const baseDate = dayjs(
    "28-04-2026",
    "DD-MM-YYYY"
  );

  const [selectedDate, setSelectedDate] =
    useState(baseDate);

  const formattedDate =
    selectedDate.format("DD-MM-YYYY");

  const next7days = [...Array(7)].map((_, i) =>
    baseDate.add(i, "day")
  );

  // ✅ API CALL
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "shows",
      movieId,
      state,
      formattedDate,
    ],

    queryFn: async () => {
      const res =
        await getshowsByMovieAndLocation(
          movieId,
          state,
          formattedDate
        );

      console.log("FULL API RESPONSE 👉", res);

      return res;
    },

    placeholderData: keepPreviousData,
  });

  // ✅ Actual array
  const showData = response?.data || [];

  console.log("SHOW DATA 👉", showData);

  if (isLoading) {
    return (
      <p className="p-4 text-center">
        Loading shows...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="p-4 text-red-500">
        {error?.message ||
          "Error loading shows"}
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* DATE SELECTOR */}
      <div className="flex items-center gap-3 overflow-x-auto py-4 px-2 border-b mb-5">
        {next7days.map((date, i) => {
          const isSelected =
            selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              onClick={() =>
                setSelectedDate(date)
              }
              className={`min-w-[65px] rounded-xl border px-3 py-2 transition ${
                isSelected
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <p className="text-lg font-bold">
                {date.format("D")}
              </p>

              <p className="text-xs">
                {date.format("ddd")}
              </p>

              <p className="text-xs">
                {date.format("MMM")}
              </p>
            </button>
          );
        })}
      </div>

      {/* EMPTY */}
      {showData.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          No shows available
        </div>
      )}

      {/* THEATERS */}
      <div className="space-y-8 px-2 pb-10">
        {showData.map((curr, i) => {
          const theater =
            curr?.theater?.theaterDetails;

          const shows =
            curr?.theater?.shows || [];

          return (
            <div
              key={i}
              className="border rounded-xl p-4"
            >
              {/* TOP */}
              <div className="flex items-start gap-4">
                <img
                  src={theater?.logo}
                  alt="logo"
                  className="w-10 h-10 rounded object-cover border"
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    {theater?.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {theater?.location}
                  </p>
                </div>
              </div>

              {/* SHOW BUTTONS */}
              <div className="flex flex-wrap gap-3 mt-5 ml-14">
                {shows.map((slot, j) => {
                  const theaterId =
                    theater?._id;

                  const movieName =
                    curr?.movie?.title
                      ?.toLowerCase()
                      ?.replace(
                        /[^a-z0-9 ]/g,
                        ""
                      )
                      ?.replace(/\s+/g, "-");

                  return (
                    <button
                      key={j}
                      onClick={() =>
                        navigate(
                          `/movies/${movieId}/${movieName}/${state}/theater/${theaterId}/show/${slot._id}/seat-layout`
                        )
                      }
                      className="border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition"
                    >
                      {slot.startTime} •{" "}
                      {slot.audioType}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TheaterTimings;
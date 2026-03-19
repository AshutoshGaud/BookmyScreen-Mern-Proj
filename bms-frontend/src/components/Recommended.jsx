import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getRecommendedMovies } from "../apis";
import { movies as fallbackMovies } from "../utils/constants";

const Recommended = () => {
  const navigate = useNavigate();
  const { city } = useParams();

  const safeCity = city || "mumbai";

  const handleNavigate = (movie) => {
    if (!movie?.title) return;

    const formattedTitle = movie.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    const movieId = movie._id || movie.id;

    navigate(`/movies/${safeCity}/${formattedTitle}/${movieId}/ticket`);
  };

  const {
    data: recMovies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: async() => {
      return await getRecommendedMovies();
    },
    placeholderData : keepPreviousData
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-10">Something went wrong!</p>;
  }

  const displayMovies = recMovies.length ? recMovies : fallbackMovies;

  return (
    <div className="w-full py-6 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recommended Movies</h2>
          <span
          onClick={() => navigate("/movies")}
            className="text-md text-red-500 cursor-pointer hover:underline">
            See All
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayMovies.map((movie) => (
            <div
              key={movie._id || movie.id}
              onClick={() => handleNavigate(movie)}
              className="cursor-pointer"
            >
              {/* ✅ IMAGE FIX HERE */}
              <img
                src={
                  movie.posterUrl?.startsWith("http")
                    ? movie.posterUrl
                    : `http://localhost:9000/${movie.posterUrl}`
                }
                alt={movie.title}
                className="w-full h-[300px] object-cover rounded"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />

              <div className="bg-black text-white text-sm px-2 py-1 flex justify-between">
                <span>{movie.rating ?? "N/A"}/10</span>
                <span>{movie.votes ?? 0} votes</span>
              </div>

              <h3 className="font-semibold mt-1">{movie.title}</h3>

              <p className="text-gray-500 text-sm">
                {Array.isArray(movie.genre)
                  ? movie.genre.join(" | ")
                  : movie.genre || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;

import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 🔥 IMPORTANT: backend ko MongoDB _id chahiye
    navigate(`/movies/${movie._id}`);
  };

  return (
    <div
      className="w-40 md:w-52 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={movie.img}
        alt={movie.title}
        className="rounded-lg shadow-md"
      />

      <p className="mt-2 font-medium">{movie.title}</p>
      <p className="text-xs text-gray-500">
        ⭐ {movie.rating} | {movie.votes}
      </p>
      <p className="text-sm text-gray-600">{movie.certification}</p>
      <p className="text-sm text-gray-500 truncate">
        {movie.languages}
      </p>
    </div>
  );
};

export default MovieCard;

import React from "react";
import { languages } from "../../utils/constants";
import MovieCard from "./MovieCard";

const MovieList = ({ allMovies = [] }) => {
  return (
    <div className="w-full md:w-3/4 p-4">
      
      {/* Language Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {languages.map((lang, i) => (
          <span
            key={i}
            className="bg-white border border-gray-200 
            text-[#f74362] py-1 px-3 rounded-[24px] text-sm cursor-pointer 
            hover:bg-gray-100"
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center bg-white px-6 py-6 rounded mb-6">
        <h3 className="font-semibold text-xl">Coming Soon</h3>

        <a
          href="#"
          className="text-red-500 text-sm font-medium flex items-center"
        >
          Exploring Upcoming Movies <span className="ml-1">→</span>
        </a>
      </div>

      {/* Movie Cards */}
      <div className="flex flex-wrap gap-6">
        {allMovies.length === 0 ? (
          <p className="text-gray-500">Loading movies...</p>
        ) : (
          allMovies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
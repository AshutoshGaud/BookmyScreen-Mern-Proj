import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
import TheaterTimings from "../components/movies/TheaterTimings";

const filters = ["Today", "Tomorrow", "IMAX", "2D", "Hindi", "English"];

const MovieDetails = () => {
  const { movieId , state } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/movies/${movieId}`
        );

        const data = await res.json();

        // handle both response types
        setMovie(data.movie ?? data);
        setLoading(false);
      } catch (err) {
        console.error("API Error", err);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!movie) return <p className="loading">Movie not found</p>;

  return (
    <>
      {/* MovieDetails Section */}
      <div
        className="relative text-white font-sans px-4 py-10"
        style={{
          backgroundImage: `url(${movie?.posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Poster */}
          <div>
            <img
              src={movie?.posterUrl}
              alt={movie?.title}
              className="rounded-xl w-52 shadow-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#3a3a3a] px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                <span className="text-pink-500 font-bold">
                  ★ {movie?.rating}
                </span>

                <span className="text-gray-300">
                  {movie?.votes} Votes
                </span>

                <button className="cursor-pointer bg-[#2f2f2f] ml-6 px-4 py-2 rounded-md hover:bg-[#4a4a4a]">
                  Rate now
                </button>
              </div>
            </div>

            {/* Format & Language */}
            <div className="flex items-center gap-3 text-sm mb-4">
              <span className="bg-[#3a3a3a] px-3 py-1 rounded">
                {movie?.format?.join(", ")}
              </span>

              <span className="bg-[#3a3a3a] px-3 py-1 rounded">
                {movie?.languages?.join(", ")}
              </span>
            </div>

            {/* Info */}
            <p className="text-sm text-gray-300 mb-4">
              {movie?.duration} • {movie?.genre?.join(", ")} •{" "}
              {movie?.certification} •{" "}
              {new Date(movie?.releaseDate).toDateString()}
            </p>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-2">About the movie</h2>
              <p className="text-sm text-gray-50 leading-relaxed mb-4">
                {movie?.description}
              </p>
            </div>
          </div>

          {/* Share Button */}
          <div className="absolute top-0 right-0 cursor-pointer">
            <button
              className="cursor-pointer bg-[#3a3a3a] px-4 py-2 rounded
              text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.21c.05-.25.09-.51.09-.78s-.03-.53-.09-.78l7.04-4.15c.54.5 1.25.81 2.05.81 1.66 0 3-1.34 3-3S19.66 2 18 2s-3 1.34-3 3c0 .27.04.52.09.78L7.91 9.93C7.38 9.43 6.67 9.12 5.87 9.12 4.21 9.12 2.87 10.46 2.87 12.12s1.34 3 3 3c.8 0 1.51-.31 2.04-.81l7.13 4.21c-.06.24-.1.49-.1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Show Timings */}
      <div className="max-w-7xl mx-auto mt-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {filters.map((filter, i) => (
            <button
              key={i}
              className="border border-gray-300 px-5 py-1 rounded-lg
              cursor-pointer text-sm hover:bg-gray-100"
            >
              {filter}
            </button>
          ))}
        </div>

        <hr className="my-2 border-gray-200" />

        {/* Availability Status */}
        <div className="flex items-center gap-4 rounded-s-sm mb-1 py-2 text-sm px-8 bg-gray-200">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 mr-1 bg-black rounded-full inline-block"></span>
            <small className="font-semibold text-gray-500">Available</small>
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2 h-2 mr-1 bg-yellow-400 rounded-full inline-block"></span>
            <small className="font-semibold text-gray-500">Filling fast</small>
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2 h-2 mr-1 bg-red-400 rounded-full inline-block"></span>
            <small className="font-semibold text-gray-500">Almost full</small>
          </span>
        </div>

        {/* Theatre Timings */}
        <TheaterTimings movieId={movieId} />
      </div>
    </>
  );
};

export default MovieDetails;

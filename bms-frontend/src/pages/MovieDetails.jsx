import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/movies/${movieId}`
        );
        const data = await res.json();

        // 🔥 IMPORTANT (safe check)
        setMovie(data.movie || data);
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
    <div
      className="movie-hero"
      style={{
        backgroundImage: `url(${movie.bannerUrl || movie.posterUrl})`,
      }}
    >
      <div className="overlay">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="poster"
        />

        <div className="info">
          <h1>{movie.title}</h1>

          {movie.rating && (
            <p className="rating">⭐ {movie.rating} / 10</p>
          )}

          <p>{movie.description}</p>

          {movie.duration && (
            <p>⏱ Duration: {movie.duration}</p>
          )}

          {movie.votes && (
            <p>👥 {movie.votes} votes</p>
          )}

          <button className="book-btn">
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

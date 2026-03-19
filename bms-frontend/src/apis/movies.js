import axios from "axios";

export const getMovieById = async (id) => {
  const res = await axios.get(`http://localhost:9000/api/movies/${id}`);
  return res.data;
};

export const getshowsByMovieAndLocation = async (movieId, state, date) => {
  const res = await axios.get(
    `http://localhost:9000/api/shows/${movieId}?state=${state}&date=${date}`
  );
  return res.data;
};
import axios from "axios";

export const getShowById = async (id) => {
  const res = await axios.get(`http://localhost:9000/api/v1/shows/${id}`);
  return res;
};

// movies.js
export const getshowsByMovieAndLocation = async (movieId, state, date) => {
  const res = await axios.get(
    `http://localhost:9000/api/v1/shows?movieId=${movieId}&state=${state}&date=${date}`
  );
  return res.data;
};
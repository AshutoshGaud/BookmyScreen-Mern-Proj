import axios from "axios";

export const getShowById = async (id) => {
  const res = await axios.get(
    `http://localhost:9000/api/v1/shows/${id}`
  );

  return res.data;
};

// ✅ FIXED
export const getshowsByMovieAndLocation = async (
  movieId,
  location,
  date
) => {
  const res = await axios.get(
    `http://localhost:9000/api/v1/shows?movieId=${movieId}&location=${location}&date=${date}`
  );

  return res.data;
};
import axios from "axios";

export const getMovieById = async (id) => {
  const res = await axios.get(
    `http://localhost:9000/api/movies/${id}`
  );
  return res.data; // ✅ direct data
};

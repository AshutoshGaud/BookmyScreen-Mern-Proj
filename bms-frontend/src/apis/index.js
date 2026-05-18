import { axioswrapper } from "./axiosWrapper";

// Movies APIs
export const getRecommendedMovies = async () => {
  const res = await axioswrapper.get("/movies/recommended");
  return res.data.topMovies;
};

export const getAllMovies = () => axioswrapper.get("/movies");

export const getMovieById = (id) =>
  axioswrapper.get(`/movies/${id}`);

export const getShowsByMovieAndLocation = (movieId, state, date) =>
  axioswrapper.get("/shows", {
    params: {
      movieId,
      state,
      date,
    },
  });

export const getShowById = (id) =>
  axioswrapper.get(`/shows/${id}`);

// Authentication APIs
export const sendOTP = (data) =>
  axioswrapper.post("/auth/send-otp", data);

export const verifyOTP = (data) =>
  axioswrapper.post("/auth/verify-otp", data, {
    withCredentials: true,
  });

export const activate = ({ id, ...data }) =>
  axioswrapper.put(`/users/activate/${id}`, data, {
    withCredentials: true,
  });

export const logout = () =>
  axioswrapper.post("/auth/logout");

export const getUser = () =>
  axioswrapper.get("/users/me");
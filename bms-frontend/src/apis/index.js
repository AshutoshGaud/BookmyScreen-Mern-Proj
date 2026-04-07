import { axioswrapper } from "./axiosWrapper";


 // List all the endpoints;
 export const getRecommendedMovies = async () => {
  const res = await axioswrapper.get("/movies/recommended");
  return res.data.topMovies;
};
 export const getAllMovies = () => axioswrapper.get("/movies");
 export const getMovieById = (data) => axioswrapper.get(`/movies/${data}`)
 export const getShowsByMovieAndLocation = (movieId, state, date) =>
    axioswrapper.get("/shows", {
        params : {
            movieId, state, date
        }
    });
    export const getShowById = (data) => axioswrapper.get(`/shows/${data}`);
 
    //Authentication APIS
    export const sendOTP = (data) => axioswrapper.post("/auth/send-otp",data);
    export const verifyOTP =(data) => axioswrapper.post("/auth/verify-otp",data);
    export const activate = ({id, ...data}) => axioswrapper.post(`/user/${id}/activate`, data);

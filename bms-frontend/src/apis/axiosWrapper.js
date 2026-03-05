import axios from "axios";

const defaultHeader = {
    "Content-Type": "application/json",
    Accept : "application/json",
};

export const axioswrapper = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers : {...defaultHeader },

})
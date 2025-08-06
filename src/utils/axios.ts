import axios from "axios";
import store from "../redux/store.js";
import { setUser } from "../redux/authSlice.js";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;


const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Attach JWT
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handling 401 & 403 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      store.dispatch(setUser(null));
      localStorage.removeItem("token");
      toast.error("You need to be logged in to perform this action.", {
        toastId: "auth-error",
        style: {
          fontFamily: '"Inter var", sans-serif',
          fontSize: "14px",
          fontWeight: 400,
        },
      }, );
    }

    return Promise.reject(error);
  }
);

export default API;

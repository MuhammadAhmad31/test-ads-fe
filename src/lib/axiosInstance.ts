
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_API;

if (!baseURL) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_API is not defined.");
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "nim": "211110011"
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

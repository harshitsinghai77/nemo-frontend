import axios from "axios";
import { getToken } from "../tokenStorage";

const env = process.env.REACT_APP_ENVIRONMENT;
let baseURL = process.env.REACT_APP_SERVER_URL;
if (env === "dev") {
  baseURL = "http://localhost:8000/noisli";
}

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 60 * 1000,
  headers: {
    "x-auth-token": getToken(),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (getToken()) {
      config.headers["x-auth-token"] = getToken();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

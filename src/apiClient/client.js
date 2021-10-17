import axios from "axios";
import { getToken } from "../tokenStorage";
import { get_server_url } from "./utils";

const baseURL = get_server_url();
console.log("baseURL: ", baseURL);

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

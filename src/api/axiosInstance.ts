import axios from "axios";
import outputs from "../../amplify_outputs.json";

const API_URL = `${outputs.custom["amplify-api"].endpoint}`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Sent:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error: ", error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;

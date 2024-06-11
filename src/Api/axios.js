import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-backend-16pi.onrender.com"
});

export {axiosInstance};
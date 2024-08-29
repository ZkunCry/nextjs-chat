// tools/ api.js
import axios, { type AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    ContentType: "application/json",
  },
});



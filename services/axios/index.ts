// tools/ api.js
import axios, { type AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    ContentType: "application/json",
  },
});

export const fetchData = async (
  url: string,
  options = {}
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};

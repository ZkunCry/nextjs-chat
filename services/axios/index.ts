import axios, { type AxiosResponse, type AxiosError } from "axios";
import { useAuth } from "@/store/auth";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    ContentType: "application/json",
  },
});
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;
  console.log("f");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        // Запрос на обновление токена
        const refreshResponse = await axiosInstance.post("/api/auth/refresh");
        const newAccessToken = refreshResponse.data.accessToken;
        useAuth.getState().setAccessToken(newAccessToken);

        return axiosInstance.request(originalRequest!);
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);
        useAuth.getState().setError(refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

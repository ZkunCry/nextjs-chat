import { axiosInstance } from "@/services/axios";
import { create } from "zustand";
import axios from "axios";
export type Auth = {
  accessToken: string;
  sendRefreshForUpdateAccess: () => Promise<void>;
  setAccessToken: (accessToken: string) => void;
};
let api;

export const useAuth = create<Auth>()((set, get) => {
  const originalApi = axiosInstance;
  if (axiosInstance.interceptors.request.handlers.length === 0) {
    axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = get().accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
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
      async (error) => {
        if (error.response?.status === 401) {
          const refreshResponse = await axiosInstance.get("/api/accessToken");

          if (refreshResponse.status === 200) {
            set({ accessToken: refreshResponse.data.accessToken });

            return axiosInstance(error.config);
          } else {
            console.error("Ошибка обновления токена");
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return {
    accessToken: "",
    sendRefreshForUpdateAccess: async () => {
      set({ accessToken: "ffff" });
      get;
    },
    setAccessToken: (accessToken) => {
      set({ accessToken: accessToken });
    },
  };
});

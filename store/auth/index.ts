import { axiosInstance } from "@/services/axios";
import type { AxiosError } from "axios";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

export type Auth = {
  accessToken: string | null;
  sendRefreshForUpdateAccess: () => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  setError: (error: any) => void;
  isHydrate: boolean;
  setHydrate: (state: any) => void;
  error: any;
};
const storage: StateStorage = {
  getItem: async (name: string) => {
    console.log(name, "has been retrieved");
    console.log(localStorage.getItem(name));
    return localStorage.getItem(name) || null;
  },
  setItem: async (name: string, value: string) => {
    console.log(name, "with value", value, "has been saved");
    if (name === "accessToken" && value.length === 0)
      localStorage.setItem(name, "s");
    else localStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    console.log(name, "has been deleted");
    localStorage.removeItem(name);
  },
};
export const useAuth = create<Auth>()(
  persist(
    (set) => ({
      accessToken: "",
      error: "",
      isHydrate: false,
      sendRefreshForUpdateAccess: async () => {
        set({ accessToken: "ffff" });
      },
      setHydrate: (state) => {
        set({ isHydrate: state });
      },
      setAccessToken: (accessToken) => {
        set({ accessToken: accessToken });
      },
      setError: (error) => {
        set({ error: error });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => storage),

      onRehydrateStorage: () => (state) => {
        state?.setHydrate(true);
      },
    }
  )
);
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;
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

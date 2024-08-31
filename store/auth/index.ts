import { axiosInstance } from "@/services/axios";
import type { AxiosError } from "axios";
import { cookies } from "next/headers";
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

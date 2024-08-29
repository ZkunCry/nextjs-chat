import { create } from "zustand";
export type Auth = {
  accessToken: string;
  sendRefreshForUpdateAccess: () => Promise<void>;
  setAccessToken: (accessToken: string) => void;
};

export const useAuth = create<Auth>()((set, get) => ({
  accessToken: JSON.parse(localStorage.getItem("accessToken") || "") || "",
  sendRefreshForUpdateAccess: async () => {
    set({ accessToken: "ffff" });
    get;
  },
  setAccessToken: (accessToken) => {
    set({ accessToken: accessToken });
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
  },
}));

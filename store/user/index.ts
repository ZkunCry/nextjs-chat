import type { Role } from "@prisma/client";
import { create } from "zustand";
import User from "@/types/type";

type UserStore = {
  user: User | null;

  setUser: (credentials: User) => void;
};

export const useUser = create<UserStore>()((set) => ({
  user: null,
  setUser: (credentials) => {
    set({ user: credentials });
    localStorage.setItem("id", JSON.stringify(credentials.id));
  },
}));

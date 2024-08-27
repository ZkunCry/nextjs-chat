import type { Role } from "@prisma/client";
import { create } from "zustand";
import type { User } from "./type";

type UserStore = {
  user: User | null;
  getUserById: (id: number) => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<User>;
  signUp: (credentials: {
    username: string;
    email: string;
    password: string;
  }) => Promise<User>;
};

export const useUser = create<UserStore>()((set) => ({
  user: null,
  getUserById: async (id) => {},
  signIn: async (credentials) => {
    return {} as User;
  },
  signUp: async (credentials) => {
    return {} as User;
  },
}));

import type { Role } from "@prisma/client";
export type User = {
  id: number;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  avatar?: string;
};

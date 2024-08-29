import type { Role } from "@prisma/client";
export default interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  avatar?: string;
}
export interface UserAuth extends User {
  accessToken: string;
}

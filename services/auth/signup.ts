import type { User } from "@prisma/client";
import { fetchData } from "../axios";
type signUp = {
  username: string;
  email: string;
  password: string;
};
export async function signup(credentials: signUp) {
  const result = await fetchData("/api/user/signup", {
    data: credentials,
    method: "POST",
  });
  if (result.status === 200) console.log("fdsfsd");
}

import type { User } from "@prisma/client";
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
  return result;
}

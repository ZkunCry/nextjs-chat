import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getIdFromCookie = () => {
  const jwt = cookies().get("accessToken");
  if (jwt) return jwtDecode(jwt.value)?.id ?? null;
  else return null;
};

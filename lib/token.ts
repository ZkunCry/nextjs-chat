import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
export function generateAccessToken(id: number) {
  if (!process.env["ACCESS_TOKEN"]) throw "No secret key for access token";
  return jwt.sign({ id: id }, process.env["ACCESS_TOKEN"], {
    expiresIn: "36000s",
  });
}
export function generateRefreshToken(id: number) {
  if (!process.env["REFRESH_TOKEN"]) throw "No secret key for refresh token";
  return jwt.sign({ id: id }, process.env["REFRESH_TOKEN"], {
    expiresIn: "30d",
  });
}
export async function authAccessToken(req: NextRequest) {
  if (!process.env["ACCESS_TOKEN"]) throw "No secret key for access token";
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return false;
  const { payload } = await jwtVerify(
    token!,
    new TextEncoder().encode(process.env["ACCESS_TOKEN"])
  );
  console.log(payload);
  return true;
}

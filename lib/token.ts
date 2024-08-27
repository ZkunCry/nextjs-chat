import jwt, { JwtPayload } from "jsonwebtoken";
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
export function authAccessToken(req: NextRequest) {
  if (!process.env["ACCESS_TOKEN"]) throw "No secret key for access token";
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return false;

  const tokenID = jwt.verify(token, process.env["ACCESS_TOKEN"]);

  if (!tokenID) return false;

  return (tokenID as JwtPayload)["id"];
}

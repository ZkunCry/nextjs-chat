import { NextResponse, type NextRequest } from "next/server";
import { authAccessToken } from "@/lib/token";
import { TokenExpiredError } from "jsonwebtoken";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  let accessToken;
  console.log("fsfsd");
  const isAuthPath = path === "/signin" || path === "/signup";
  const refreshToken = request.cookies.get("refreshToken")?.value || "";

  if (isAuthPath && !refreshToken) {
    return NextResponse.next();
  } else if (isAuthPath && refreshToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else {
    try {
      accessToken = authAccessToken(request);
      console.log(accessToken);
    } catch (error) {
      if (error instanceof TokenExpiredError)
        return Response.json(
          {
            success: false,
            message: "Access Token has expired",
          },
          { status: 401 }
        );
      else if (!accessToken || !refreshToken) {
        console.log(error);
        return Response.json(
          {
            success: false,
            message: "No token has been provided",
          },
          {
            status: 401,
          }
        );
      }
    }
  }
  return NextResponse.next();
}
// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/logout",
    "/user/:id*",
    "/user",
    "/profile/:id*",
  ],
};

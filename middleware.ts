import { NextResponse, type NextRequest } from "next/server";
import { authAccessToken } from "./lib/token";
import { TokenExpiredError } from "jsonwebtoken";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/signim", "/signup", "/logout", "/"],
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  let accessToken;
  const isPublicPath = path === "/signin" || path === "/signup" || path === "/";
  if (isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  const refreshToken = request.cookies.get("refreshToken")?.value || "";
  try {
    accessToken = authAccessToken(request);
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return Response.json(
        {
          success: false,
          message: "Access Token has expired",
        },
        { status: 401 }
      );
  }
  if (!accessToken || !refreshToken)
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

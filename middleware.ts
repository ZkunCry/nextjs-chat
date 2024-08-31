import { NextResponse, type NextRequest } from "next/server";
import { authAccessToken } from "@/lib/token";
import { TokenExpiredError } from "jsonwebtoken";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  let accessToken;
  console.log("fsfsd");
  const isPublicPath = path === "/signin" || path === "/signup";
  const isAuthPath = path === "/signin" || path === "/signup";
  const refreshToken = request.cookies.get("refreshToken")?.value || "";

  if (isAuthPath && !refreshToken) {
    console.log(path);
    return NextResponse.next();
  } else if (isAuthPath && refreshToken) {
    console.log("fffff");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else {
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
}
// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/signin", "/signup", "/logout", "/user/:id*", "/user"],
};

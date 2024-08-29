import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { comparePassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/lib/token";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    if (!reqBody) return NextResponse.json({ status: 400 });
    const { email, password } = reqBody;

    const user = await prisma?.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user)
      return NextResponse.json({ error: "Wrong email" }, { status: 400 });
    if (!comparePassword(user.password_hash, password, user.password_salt))
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() +
          86400000 * parseInt(process.env["REFRESH_LIFETIME"] || "365")
      ),
    });
    const { password_hash, password_salt, ...resUser } = user;
    return NextResponse.json(
      {
        resUser,
        accessToken,
      },
      { status: 200, statusText: "User created is successful" }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

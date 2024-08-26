import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/lib/token";
export enum Role {
  USER,
  ADMIN,
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    if (!reqBody) return NextResponse.json({ status: 400 });
    const { username, email, password } = reqBody;

    const user = await prisma?.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user)
      return NextResponse.json(
        { error: "Account with that email is already exit" },
        { status: 400 }
      );
    const { hash, salt } = hashPassword(password);

    const newUser = await prisma?.user.create({
      data: {
        username: username,
        email: email,
        createdAt: new Date(),
        password_hash: hash,
        password_salt: salt,
      },
    });
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const { password_hash, password_salt, ...resUser } = newUser;
    const response = NextResponse.json({
      message: "User created is successfully",
      success: true,
      ...resUser,
      accessToken,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() +
          86400000 * parseInt(process.env["REFRESH_LIFETIME"] || "365")
      ),
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

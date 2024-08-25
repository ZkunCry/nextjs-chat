import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { hashPassword } from "@/lib/password";
export enum Role {
  USER,
  ADMIN,
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("req", reqBody);
    if (!reqBody) return NextResponse.json({ status: 400 });
    const { name, email, password } = reqBody;

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
        username: name,
        email: email,
        createdAt: new Date(),
        password_hash: hash,
        password_salt: salt,
      },
    });
    return NextResponse.json({
      message: "User created is successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import prisma from "@/lib/prisma";
import type { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const user = await prisma?.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    const { password_hash, password_salt, ...resUser } = user;
    return NextResponse.json({ ...user });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

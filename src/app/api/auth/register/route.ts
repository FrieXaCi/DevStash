import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";
import { registerSchema } from "@/lib/auth-schemas";
import { prisma } from "@/lib/prisma";

const SALT_ROUNDS = 12;

function errorResponse(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

function emailTakenResponse() {
  return errorResponse("An account with this email already exists", 409);
}

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (body === null) return errorResponse("Invalid request body", 400);

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "Invalid request", 400);
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return emailTakenResponse();

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    if (isUniqueConstraintError(error)) return emailTakenResponse();

    console.error("Registration failed:", error);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}

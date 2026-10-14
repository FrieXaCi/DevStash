import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const CREDENTIALS_FIELDS = {
  email: { label: "Email", type: "email" },
  password: { label: "Password", type: "password" },
};

// Edge-safe placeholder; the real authorize (Prisma + bcrypt) lives in auth.ts.
export default {
  pages: { signIn: "/sign-in", error: "/sign-in" },
  providers: [
    GitHub,
    Credentials({ credentials: CREDENTIALS_FIELDS, authorize: () => null }),
  ],
} satisfies NextAuthConfig;

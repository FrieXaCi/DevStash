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
    // GitHub only returns verified emails, so a matching email links to the existing user.
    GitHub({
      allowDangerousEmailAccountLinking: true,
      // Registered emails are stored lowercase; match that so the lookup finds them.
      profile: (profile) => ({
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email?.toLowerCase(),
        image: profile.avatar_url,
      }),
    }),
    Credentials({ credentials: CREDENTIALS_FIELDS, authorize: () => null }),
  ],
} satisfies NextAuthConfig;

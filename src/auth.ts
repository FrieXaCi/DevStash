import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import authConfig, { CREDENTIALS_FIELDS } from "@/auth.config";
import { signInSchema } from "@/lib/auth-schemas";
import { prisma } from "@/lib/prisma";

async function authorizeCredentials(credentials: unknown) {
  const parsed = signInSchema.safeParse(credentials);
  if (!parsed.success) return null;

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.password) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return { id: user.id, name: user.name, email: user.email, image: user.image };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers.filter(
      (provider) => typeof provider === "function" || provider.id !== "credentials",
    ),
    Credentials({ credentials: CREDENTIALS_FIELDS, authorize: authorizeCredentials }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  events: {
    // Linking to an existing user keeps its data; only fill in a missing avatar.
    async linkAccount({ user, profile }) {
      if (user.image || !profile.image || !user.id) return;
      await prisma.user.update({ where: { id: user.id }, data: { image: profile.image } });
      // Same object the jwt callback receives, so the avatar shows on this sign-in.
      user.image = profile.image;
    },
  },
});

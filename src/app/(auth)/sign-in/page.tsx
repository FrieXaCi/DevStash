import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignInForm } from "@/components/auth/SignInForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Sign in · DevStash" };

// Errors NextAuth passes back as ?error=... (e.g. after a failed OAuth sign-in)
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  OAuthAccountNotLinked:
    "This email is already registered with a password. Sign in with email and password instead.",
};
const DEFAULT_AUTH_ERROR = "Sign-in failed. Please try again.";

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  if (session?.user) redirect("/dashboard");

  const error = firstParam(params.error);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back to DevStash</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm
          callbackUrl={firstParam(params.callbackUrl) ?? "/dashboard"}
          urlError={error ? (AUTH_ERROR_MESSAGES[error] ?? DEFAULT_AUTH_ERROR) : undefined}
          registered={firstParam(params.registered) === "1"}
        />
      </CardContent>
    </Card>
  );
}

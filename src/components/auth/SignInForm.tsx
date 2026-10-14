"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signInWithCredentials, signInWithGitHub } from "@/actions/auth";
import { FormAlert } from "@/components/auth/FormAlert";
import { FormField } from "@/components/auth/FormField";
import { GitHubIcon } from "@/components/auth/GitHubIcon";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/types/actions";

interface SignInFormProps {
  callbackUrl: string;
  urlError?: string;
  registered: boolean;
}

const INITIAL_STATE: ActionResult = { success: false };

export function SignInForm({ callbackUrl, urlError, registered }: SignInFormProps) {
  const [state, formAction, pending] = useActionState(signInWithCredentials, INITIAL_STATE);
  // Controlled so the email survives React's form reset after a failed sign-in
  const [email, setEmail] = useState("");
  const error = state.error ?? urlError;

  return (
    <div className="flex flex-col gap-6">
      {error && <FormAlert message={error} />}
      {!error && registered && (
        <FormAlert variant="success" message="Account created. Sign in to continue." />
      )}

      <form action={signInWithGitHub}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Button type="submit" variant="outline" className="w-full">
          <GitHubIcon className="size-4" />
          Sign in with GitHub
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} noValidate className="flex flex-col gap-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-foreground hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { FormAlert } from "@/components/auth/FormAlert";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/auth-schemas";

type FieldErrors = Partial<Record<keyof z.input<typeof registerSchema>, string[]>>;

const GENERIC_ERROR = "Something went wrong. Please try again.";

async function submitRegistration(values: Record<string, FormDataEntryValue>) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return (await response.json()) as { success: boolean; error?: string };
}

export function RegisterForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));

    const parsed = registerSchema.safeParse(values);
    setFormError(undefined);
    setFieldErrors(parsed.success ? {} : z.flattenError(parsed.error).fieldErrors);
    if (!parsed.success) return;

    setPending(true);
    try {
      const result = await submitRegistration(values);
      if (result.success) {
        router.push("/sign-in?registered=1");
        return;
      }
      setFormError(result.error ?? GENERIC_ERROR);
    } catch {
      setFormError(GENERIC_ERROR);
    }
    setPending(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {formError && <FormAlert message={formError} />}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField name="name" label="Name" autoComplete="name" error={fieldErrors.name?.[0]} />
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={fieldErrors.email?.[0]}
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          error={fieldErrors.password?.[0]}
        />
        <FormField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={fieldErrors.confirmPassword?.[0]}
        />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

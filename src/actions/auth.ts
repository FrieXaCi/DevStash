"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { signInSchema } from "@/lib/auth-schemas";
import type { ActionResult } from "@/types/actions";

const DEFAULT_REDIRECT = "/dashboard";

// Only allow same-site relative paths, so callbackUrl can't redirect off-site
function getRedirectTo(callbackUrl: FormDataEntryValue | null) {
  if (typeof callbackUrl !== "string") return DEFAULT_REDIRECT;
  if (!callbackUrl.startsWith("/") || ["//", "/\\"].some((prefix) => callbackUrl.startsWith(prefix))) {
    return DEFAULT_REDIRECT;
  }
  return callbackUrl;
}

export async function signInWithCredentials(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: getRedirectTo(formData.get("callbackUrl")) });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      const message =
        error.type === "CredentialsSignin"
          ? "Invalid email or password."
          : "Sign-in failed. Please try again.";
      return { success: false, error: message };
    }
    // signIn throws a redirect on success; let Next.js handle it
    throw error;
  }
}

export async function signInWithGitHub(formData: FormData) {
  await signIn("github", { redirectTo: getRedirectTo(formData.get("callbackUrl")) });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/sign-in" });
}

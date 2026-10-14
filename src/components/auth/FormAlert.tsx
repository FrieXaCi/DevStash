import { cn } from "@/lib/utils";

interface FormAlertProps {
  message: string;
  variant?: "error" | "success";
}

export function FormAlert({ message, variant = "error" }: FormAlertProps) {
  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        variant === "error"
          ? "border-destructive/50 bg-destructive/10 text-destructive"
          : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
      )}
    >
      {message}
    </p>
  );
}

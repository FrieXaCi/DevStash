import { createElement } from "react";
import { getTypeIcon, type ItemTypeDisplay } from "@/lib/item-types";

interface TypeIconProps {
  type: ItemTypeDisplay | undefined;
  className?: string;
}

export function TypeIcon({ type, className }: TypeIconProps) {
  return createElement(getTypeIcon(type?.icon ?? "File"), {
    className,
    color: type?.color ?? undefined,
    "aria-label": type?.name,
  });
}

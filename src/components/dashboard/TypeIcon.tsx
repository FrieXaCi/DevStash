import { createElement } from "react";
import { getTypeIcon } from "@/lib/item-types";
import type { MockItemType } from "@/lib/mock-data";

interface TypeIconProps {
  type: MockItemType | undefined;
  className?: string;
}

export function TypeIcon({ type, className }: TypeIconProps) {
  return createElement(getTypeIcon(type?.icon ?? "File"), {
    className,
    color: type?.color,
    "aria-label": type?.name,
  });
}

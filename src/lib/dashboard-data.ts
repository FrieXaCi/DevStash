import type { CollectionStats } from "@/lib/db/collections";
import type { ItemStats } from "@/lib/db/items";

export type DashboardStats = ItemStats & CollectionStats;

export function formatItemDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

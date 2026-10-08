import type { CollectionStats } from "@/lib/db/collections";
import { items, type MockItem } from "@/lib/mock-data";

const RECENT_ITEMS_LIMIT = 10;

export interface ItemStats {
  totalItems: number;
  favoriteItems: number;
}

export type DashboardStats = ItemStats & CollectionStats;

function byUpdatedAtDesc(a: MockItem, b: MockItem) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

export function getItemStats(): ItemStats {
  return {
    totalItems: items.length,
    favoriteItems: items.filter((item) => item.isFavorite).length,
  };
}

export function getPinnedItems(): MockItem[] {
  return items.filter((item) => item.isPinned).sort(byUpdatedAtDesc);
}

export function getRecentItems(): MockItem[] {
  return [...items].sort(byUpdatedAtDesc).slice(0, RECENT_ITEMS_LIMIT);
}

export function formatItemDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(isoDate)
  );
}

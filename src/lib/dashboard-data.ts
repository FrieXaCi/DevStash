import { collections, items, type MockCollection, type MockItem } from "@/lib/mock-data";

const DASHBOARD_COLLECTIONS_LIMIT = 6;
const RECENT_ITEMS_LIMIT = 10;

export interface DashboardStats {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

function byUpdatedAtDesc(a: MockItem, b: MockItem) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

function getLastActivity(collectionId: string) {
  return items
    .filter((item) => item.collectionId === collectionId)
    .reduce((latest, item) => (item.updatedAt > latest ? item.updatedAt : latest), "");
}

export function getDashboardStats(): DashboardStats {
  return {
    totalItems: items.length,
    totalCollections: collections.length,
    favoriteItems: items.filter((item) => item.isFavorite).length,
    favoriteCollections: collections.filter((collection) => collection.isFavorite).length,
  };
}

export function getDashboardCollections(): MockCollection[] {
  return collections
    .map((collection) => ({ collection, lastActivity: getLastActivity(collection.id) }))
    .sort((a, b) => b.lastActivity.localeCompare(a.lastActivity))
    .slice(0, DASHBOARD_COLLECTIONS_LIMIT)
    .map(({ collection }) => collection);
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

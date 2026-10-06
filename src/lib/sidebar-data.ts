import { collections, items, type MockCollection } from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 5;

export function getTypeHref(typeName: string) {
  return `/items/${typeName.toLowerCase()}`;
}

export function getFavoriteCollections(): MockCollection[] {
  return collections.filter((collection) => collection.isFavorite);
}

function getLastActivity(collectionId: string) {
  return items
    .filter((item) => item.collectionId === collectionId)
    .reduce((latest, item) => (item.updatedAt > latest ? item.updatedAt : latest), "");
}

export function getRecentCollections(): MockCollection[] {
  return collections
    .filter((collection) => !collection.isFavorite)
    .map((collection) => ({ collection, lastActivity: getLastActivity(collection.id) }))
    .sort((a, b) => b.lastActivity.localeCompare(a.lastActivity))
    .slice(0, RECENT_COLLECTIONS_LIMIT)
    .map(({ collection }) => collection);
}

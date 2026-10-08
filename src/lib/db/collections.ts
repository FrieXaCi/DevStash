import { prisma } from "@/lib/prisma";
import type { ItemTypeDisplay } from "@/lib/item-types";

const RECENT_COLLECTIONS_LIMIT = 6;

export interface CollectionType extends ItemTypeDisplay {
  id: string;
}

export interface DashboardCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  // Sorted by how many items of that type the collection holds, most-used first
  types: CollectionType[];
}

export interface CollectionStats {
  totalCollections: number;
  favoriteCollections: number;
}

function getTypesByUsage(itemTypes: CollectionType[]): CollectionType[] {
  const usage = new Map<string, { type: CollectionType; count: number }>();

  for (const type of itemTypes) {
    const entry = usage.get(type.id);
    if (entry) entry.count++;
    else usage.set(type.id, { type, count: 1 });
  }

  return [...usage.values()].sort((a, b) => b.count - a.count).map(({ type }) => type);
}

export async function getRecentCollections(limit = RECENT_COLLECTIONS_LIMIT): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      items: {
        select: { type: { select: { id: true, name: true, icon: true, color: true } } },
      },
    },
  });

  return collections.map(({ items, ...collection }) => ({
    ...collection,
    itemCount: items.length,
    types: getTypesByUsage(items.map((item) => item.type)),
  }));
}

export async function getCollectionStats(): Promise<CollectionStats> {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count(),
    prisma.collection.count({ where: { isFavorite: true } }),
  ]);

  return { totalCollections, favoriteCollections };
}

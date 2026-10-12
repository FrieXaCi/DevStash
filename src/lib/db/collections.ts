import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { ItemTypeDisplay } from "@/lib/item-types";

const RECENT_COLLECTIONS_LIMIT = 6;
const SIDEBAR_RECENT_COLLECTIONS_LIMIT = 5;

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

export interface SidebarCollections {
  favorites: DashboardCollection[];
  recents: DashboardCollection[];
}

// One groupBy for all collections, then one lookup for the referenced types
async function getTypesByCollection(collectionIds: string[]): Promise<Map<string, CollectionType[]>> {
  const typeCounts = await prisma.item.groupBy({
    by: ["collectionId", "typeId"],
    where: { collectionId: { in: collectionIds } },
    _count: true,
  });

  const typeIds = [...new Set(typeCounts.map(({ typeId }) => typeId))];
  const types = await prisma.itemType.findMany({
    where: { id: { in: typeIds } },
    select: { id: true, name: true, icon: true, color: true },
  });
  const typesById = new Map(types.map((type) => [type.id, type]));

  const typesByCollection = new Map<string, CollectionType[]>();
  const sortedCounts = [...typeCounts].sort((a, b) => b._count - a._count);

  for (const { collectionId, typeId } of sortedCounts) {
    const type = typesById.get(typeId);
    if (!collectionId || !type) continue;

    const collectionTypes = typesByCollection.get(collectionId) ?? [];
    collectionTypes.push(type);
    typesByCollection.set(collectionId, collectionTypes);
  }

  return typesByCollection;
}

async function findCollections(args: {
  where?: Prisma.CollectionWhereInput;
  orderBy: Prisma.CollectionOrderByWithRelationInput;
  take?: number;
}): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    ...args,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      _count: { select: { items: true } },
    },
  });

  if (collections.length === 0) return [];

  const typesByCollection = await getTypesByCollection(collections.map(({ id }) => id));

  return collections.map(({ _count, ...collection }) => ({
    ...collection,
    itemCount: _count.items,
    types: typesByCollection.get(collection.id) ?? [],
  }));
}

export async function getRecentCollections(limit = RECENT_COLLECTIONS_LIMIT): Promise<DashboardCollection[]> {
  return findCollections({ orderBy: { updatedAt: "desc" }, take: limit });
}

export async function getSidebarCollections(): Promise<SidebarCollections> {
  const [favorites, recents] = await Promise.all([
    findCollections({ where: { isFavorite: true }, orderBy: { name: "asc" } }),
    findCollections({
      where: { isFavorite: false },
      orderBy: { updatedAt: "desc" },
      take: SIDEBAR_RECENT_COLLECTIONS_LIMIT,
    }),
  ]);

  return { favorites, recents };
}

export async function getCollectionStats(): Promise<CollectionStats> {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count(),
    prisma.collection.count({ where: { isFavorite: true } }),
  ]);

  return { totalCollections, favoriteCollections };
}

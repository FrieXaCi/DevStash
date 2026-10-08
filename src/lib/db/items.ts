import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { getSystemTypeOrder, type ItemTypeDisplay } from "@/lib/item-types";

const RECENT_ITEMS_LIMIT = 10;

export interface DashboardItem {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  updatedAt: Date;
  type: ItemTypeDisplay;
  tags: string[];
}

export interface SidebarItemType extends ItemTypeDisplay {
  id: string;
  itemCount: number;
}

export interface ItemStats {
  totalItems: number;
  favoriteItems: number;
}

const DASHBOARD_ITEM_SELECT = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  updatedAt: true,
  type: { select: { name: true, icon: true, color: true } },
  tags: { select: { tag: { select: { name: true } } }, orderBy: { tag: { name: "asc" } } },
} satisfies Prisma.ItemSelect;

type DashboardItemRow = Prisma.ItemGetPayload<{ select: typeof DASHBOARD_ITEM_SELECT }>;

function toDashboardItem({ tags, ...item }: DashboardItemRow): DashboardItem {
  return { ...item, tags: tags.map(({ tag }) => tag.name) };
}

export async function getPinnedItems(): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: DASHBOARD_ITEM_SELECT,
  });

  return items.map(toDashboardItem);
}

export async function getRecentItems(limit = RECENT_ITEMS_LIMIT): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: DASHBOARD_ITEM_SELECT,
  });

  return items.map(toDashboardItem);
}

export async function getSystemItemTypes(): Promise<SidebarItemType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: { id: true, name: true, icon: true, color: true, _count: { select: { items: true } } },
  });

  return types
    .map(({ _count, ...type }) => ({ ...type, itemCount: _count.items }))
    .sort((a, b) => getSystemTypeOrder(a.name) - getSystemTypeOrder(b.name));
}

export async function getItemStats(): Promise<ItemStats> {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count(),
    prisma.item.count({ where: { isFavorite: true } }),
  ]);

  return { totalItems, favoriteItems };
}

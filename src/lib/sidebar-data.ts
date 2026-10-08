import type { SidebarCollections } from "@/lib/db/collections";
import type { SidebarItemType } from "@/lib/db/items";

export interface SidebarData extends SidebarCollections {
  itemTypes: SidebarItemType[];
}

export function getTypeHref(typeName: string) {
  return `/items/${typeName.toLowerCase()}`;
}

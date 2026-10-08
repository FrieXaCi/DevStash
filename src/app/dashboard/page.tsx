import { Clock, Pin } from "lucide-react";
import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { ItemRow } from "@/components/dashboard/ItemRow";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { getCollectionStats, getRecentCollections } from "@/lib/db/collections";
import { getItemStats, getPinnedItems, getRecentItems } from "@/lib/db/items";

// Render per request so the dashboard reflects the current database state
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [collections, collectionStats, pinnedItems, recentItems, itemStats] = await Promise.all([
    getRecentCollections(),
    getCollectionStats(),
    getPinnedItems(),
    getRecentItems(),
    getItemStats(),
  ]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards stats={{ ...itemStats, ...collectionStats }} />

      <DashboardSection title="Collections" viewAllHref="/collections">
        {collections.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No collections yet.</p>
        )}
      </DashboardSection>

      {pinnedItems.length > 0 && (
        <DashboardSection title="Pinned" icon={Pin}>
          <div className="flex flex-col gap-3">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </DashboardSection>
      )}

      <DashboardSection title="Recent Items" icon={Clock}>
        {recentItems.length > 0 ? (
          <div className="flex flex-col gap-3">
            {recentItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No items yet.</p>
        )}
      </DashboardSection>
    </div>
  );
}

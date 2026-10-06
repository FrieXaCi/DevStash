import { Clock, Pin } from "lucide-react";
import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { ItemRow } from "@/components/dashboard/ItemRow";
import { StatsCards } from "@/components/dashboard/StatsCards";
import {
  getDashboardCollections,
  getDashboardStats,
  getPinnedItems,
  getRecentItems,
} from "@/lib/dashboard-data";

export default function DashboardPage() {
  const pinnedItems = getPinnedItems();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards stats={getDashboardStats()} />

      <DashboardSection title="Collections" viewAllHref="/collections">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {getDashboardCollections().map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
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
        <div className="flex flex-col gap-3">
          {getRecentItems().map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

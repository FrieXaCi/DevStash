import { Files, Folder, FolderHeart, Star, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/dashboard-data";

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatCard[] = [
    { label: "Items", value: stats.totalItems, icon: Files },
    { label: "Collections", value: stats.totalCollections, icon: Folder },
    { label: "Favorite Items", value: stats.favoriteItems, icon: Star },
    { label: "Favorite Collections", value: stats.favoriteCollections, icon: FolderHeart },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-2xl font-semibold">{value}</span>
            </div>
            <Icon className="size-5 shrink-0 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

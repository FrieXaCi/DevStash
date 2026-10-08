import { Pin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TypeIcon } from "@/components/dashboard/TypeIcon";
import { formatItemDate } from "@/lib/dashboard-data";
import type { DashboardItem } from "@/lib/db/items";

interface ItemRowProps {
  item: DashboardItem;
}

export function ItemRow({ item }: ItemRowProps) {
  const { type } = item;

  return (
    <Card
      className="border-l-4 border-l-border transition-colors hover:bg-accent/50"
      style={type.color ? { borderLeftColor: type.color } : undefined}
    >
      <CardContent className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <TypeIcon type={type} className="size-4" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{item.title}</h3>
            {item.isPinned && <Pin className="size-3.5 shrink-0 text-muted-foreground" />}
            {item.isFavorite && <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />}
          </div>
          {item.description && <p className="truncate text-muted-foreground">{item.description}</p>}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <time dateTime={item.updatedAt.toISOString()}className="shrink-0 text-xs text-muted-foreground">
          {formatItemDate(item.updatedAt)}
        </time>
      </CardContent>
    </Card>
  );
}

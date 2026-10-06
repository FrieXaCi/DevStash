import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypeIcon } from "@/components/dashboard/TypeIcon";
import { getItemType } from "@/lib/item-types";
import type { MockCollection } from "@/lib/mock-data";

interface CollectionCardProps {
  collection: MockCollection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const types = collection.typeIds.map(getItemType).filter((type) => type !== undefined);
  const accentColor = types[0]?.color;

  return (
    <Link href={`/collections/${collection.id}`} className="rounded-xl">
      <Card
        className="h-full border-l-4 border-l-border transition-colors hover:bg-accent/50"
        style={accentColor ? { borderLeftColor: accentColor } : undefined}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="truncate">{collection.name}</span>
            {collection.isFavorite && <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />}
          </CardTitle>
          <CardDescription>{collection.itemCount} items</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="line-clamp-2 text-muted-foreground">{collection.description}</p>
          <div className="flex items-center gap-2">
            {types.map((type) => (
              <TypeIcon key={type.id} type={type} className="size-4" />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

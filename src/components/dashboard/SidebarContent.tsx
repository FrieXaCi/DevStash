import Link from "next/link";
import type { Session } from "next-auth";
import { ArrowRight, Folder, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarNavLink } from "@/components/dashboard/SidebarNavLink";
import { SidebarUser } from "@/components/dashboard/SidebarUser";
import type { DashboardCollection } from "@/lib/db/collections";
import { getTypeIcon, getTypeLabel, isProType } from "@/lib/item-types";
import { getTypeHref, type SidebarData } from "@/lib/sidebar-data";

interface SidebarContentProps {
  data: SidebarData;
  user: Session["user"];
  collapsed: boolean;
  onNavigate?: () => void;
}

interface SidebarSectionProps {
  title: string;
  collapsed: boolean;
  children: React.ReactNode;
}

interface CollectionLinksProps {
  collections: DashboardCollection[];
  collapsed: boolean;
  onNavigate?: () => void;
}

function SidebarSection({ title, collapsed, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {!collapsed && <h3 className="px-2 pb-1 text-sm font-medium text-muted-foreground">{title}</h3>}
      {children}
    </div>
  );
}

function SidebarSubheading({ title, collapsed }: { title: string; collapsed: boolean }) {
  if (collapsed) return null;

  return (
    <h4 className="px-2 pt-2 pb-1 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
      {title}
    </h4>
  );
}

function TypeDot({ color }: { color: string | null | undefined }) {
  return (
    <span
      className="size-2.5 shrink-0 rounded-full bg-muted-foreground"
      style={color ? { backgroundColor: color } : undefined}
    />
  );
}

function CollectionLinks({ collections, collapsed, onNavigate }: CollectionLinksProps) {
  return collections.map((collection) => (
    <SidebarNavLink
      key={collection.id}
      href={`/collections/${collection.id}`}
      label={collection.name}
      icon={Folder}
      collapsed={collapsed}
      onNavigate={onNavigate}
      trailing={
        collection.isFavorite ? (
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
        ) : (
          <TypeDot color={collection.types[0]?.color} />
        )
      }
    />
  ));
}

export function SidebarContent({ data, user, collapsed, onNavigate }: SidebarContentProps) {
  const { itemTypes, favorites, recents } = data;

  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">
        <SidebarSection title="Types" collapsed={collapsed}>
          {itemTypes.map((type) => (
            <SidebarNavLink
              key={type.id}
              href={getTypeHref(type.name)}
              label={getTypeLabel(type.name)}
              icon={getTypeIcon(type.icon ?? "File")}
              iconColor={type.color ?? undefined}
              collapsed={collapsed}
              onNavigate={onNavigate}
              trailing={
                <>
                  {isProType(type.name) && (
                    <Badge
                      variant="outline"
                      className="h-4 px-1.5 text-[10px] font-semibold tracking-wide text-muted-foreground"
                    >
                      PRO
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{type.itemCount}</span>
                </>
              }
            />
          ))}
        </SidebarSection>

        <Separator />

        <SidebarSection title="Collections" collapsed={collapsed}>
          {favorites.length > 0 && (
            <>
              <SidebarSubheading title="Favorites" collapsed={collapsed} />
              <CollectionLinks collections={favorites} collapsed={collapsed} onNavigate={onNavigate} />
            </>
          )}

          {recents.length > 0 && (
            <>
              <SidebarSubheading title="Recent" collapsed={collapsed} />
              <CollectionLinks collections={recents} collapsed={collapsed} onNavigate={onNavigate} />
            </>
          )}

          {!collapsed && (
            <Link
              href="/collections"
              onClick={onNavigate}
              className="mt-2 flex items-center gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              View all collections
              <ArrowRight className="size-3" />
            </Link>
          )}
        </SidebarSection>
      </nav>

      <SidebarUser user={user} collapsed={collapsed} onNavigate={onNavigate} />
    </div>
  );
}

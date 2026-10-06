import { Folder, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarNavLink } from "@/components/dashboard/SidebarNavLink";
import { SidebarUser } from "@/components/dashboard/SidebarUser";
import { getTypeIcon } from "@/lib/item-types";
import { itemTypes, type MockCollection } from "@/lib/mock-data";
import { getFavoriteCollections, getRecentCollections, getTypeHref } from "@/lib/sidebar-data";

interface SidebarContentProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

interface SidebarSectionProps {
  title: string;
  collapsed: boolean;
  children: React.ReactNode;
}

interface CollectionLinksProps {
  collections: MockCollection[];
  collapsed: boolean;
  onNavigate?: () => void;
}

function SidebarSection({ title, collapsed, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {!collapsed && (
        <h3 className="px-2 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </h3>
      )}
      {children}
    </div>
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
          <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
        )
      }
    />
  ));
}

export function SidebarContent({ collapsed, onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">
        <SidebarSection title="Types" collapsed={collapsed}>
          {itemTypes.map((type) => (
            <SidebarNavLink
              key={type.id}
              href={getTypeHref(type.name)}
              label={type.name}
              icon={getTypeIcon(type.icon)}
              iconColor={type.color}
              collapsed={collapsed}
              onNavigate={onNavigate}
              trailing={<span className="text-xs text-muted-foreground">{type.itemCount}</span>}
            />
          ))}
        </SidebarSection>

        <Separator />

        <SidebarSection title="Favorites" collapsed={collapsed}>
          <CollectionLinks
            collections={getFavoriteCollections()}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        </SidebarSection>

        <SidebarSection title="Recent" collapsed={collapsed}>
          <CollectionLinks
            collections={getRecentCollections()}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        </SidebarSection>
      </nav>

      <SidebarUser collapsed={collapsed} />
    </div>
  );
}

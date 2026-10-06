import { Layers, Plus, Search } from "lucide-react";
import { SidebarToggle } from "@/components/dashboard/SidebarToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b px-4">
      <div className="flex items-center gap-2 md:w-60">
        <SidebarToggle />
        <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600 text-white">
          <Layers className="size-4" />
        </div>
        <span className="hidden text-lg font-semibold sm:inline">DevStash</span>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search items..." className="pr-12 pl-8" />
        <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </div>

      <Button className="ml-auto">
        <Plus />
        <span className="hidden sm:inline">New Item</span>
      </Button>
    </header>
  );
}

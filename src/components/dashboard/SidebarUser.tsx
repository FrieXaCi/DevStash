import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface SidebarUserProps {
  collapsed: boolean;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function SidebarUser({ collapsed }: SidebarUserProps) {
  return (
    <div className={cn("flex items-center gap-3 border-t p-3", collapsed && "justify-center")}>
      <Avatar>
        {currentUser.image && <AvatarImage src={currentUser.image} alt={currentUser.name} />}
        <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
      </Avatar>
      {!collapsed && (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Settings">
            <Settings />
          </Button>
        </>
      )}
    </div>
  );
}

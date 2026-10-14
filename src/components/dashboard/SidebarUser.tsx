import Link from "next/link";
import type { Session } from "next-auth";
import { LogOut, Settings, User } from "lucide-react";
import { signOutUser } from "@/actions/auth";
import { UserAvatar } from "@/components/auth/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SidebarUserProps {
  user: Session["user"];
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarUser({ user, collapsed, onNavigate }: SidebarUserProps) {
  const displayName = user.name ?? user.email ?? "Account";

  return (
    <div className={cn("flex items-center gap-3 border-t p-3", collapsed && "justify-center")}>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open account menu"
          className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <UserAvatar name={user.name} email={user.email} image={user.image} />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{displayName}</p>
              {user.name && user.email && (
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              )}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={collapsed ? "right" : "top"}
          align={collapsed ? "end" : "start"}
          className="w-56"
        >
          <DropdownMenuItem render={<Link href="/profile" onClick={onNavigate} />}>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => signOutUser()}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {!collapsed && (
        <Button variant="ghost" size="icon-sm" aria-label="Settings">
          <Settings />
        </Button>
      )}
    </div>
  );
}

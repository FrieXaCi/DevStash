import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  trailing?: React.ReactNode;
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarNavLink({
  href,
  label,
  icon: Icon,
  iconColor,
  trailing,
  collapsed,
  onNavigate,
}: SidebarNavLinkProps) {
  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex h-9 items-center gap-3 rounded-md px-2 text-sm text-foreground/90 hover:bg-accent hover:text-accent-foreground",
        collapsed && "justify-center"
      )}
    >
      <Icon className={cn("size-4 shrink-0", !iconColor && "text-muted-foreground")} color={iconColor} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {trailing}
        </>
      )}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

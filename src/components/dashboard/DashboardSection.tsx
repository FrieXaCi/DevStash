import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface DashboardSectionProps {
  title: string;
  icon?: LucideIcon;
  viewAllHref?: string;
  children: React.ReactNode;
}

export function DashboardSection({ title, icon: Icon, viewAllHref, children }: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          {title}
        </h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

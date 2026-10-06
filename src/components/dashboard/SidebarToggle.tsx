"use client";

import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/dashboard/SidebarProvider";

export function SidebarToggle() {
  const { toggle } = useSidebar();

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle sidebar">
      <PanelLeft />
    </Button>
  );
}

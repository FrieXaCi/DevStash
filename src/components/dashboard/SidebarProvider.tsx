"use client";

import { createContext, useContext, useState } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

interface SidebarContextValue {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggle: () => void;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggle() {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setCollapsed((value) => !value);
    } else {
      setMobileOpen((value) => !value);
    }
  }

  return (
    <SidebarContext.Provider value={{ collapsed, mobileOpen, setMobileOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

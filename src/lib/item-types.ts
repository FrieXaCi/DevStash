import {
  Code,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export interface ItemTypeDisplay {
  name: string;
  icon: string | null;
  color: string | null;
}

const TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

// Display order for the system types; there is no ordering column in the database
const SYSTEM_TYPE_ORDER = ["snippet", "prompt", "command", "note", "file", "image", "link"];

export function getSystemTypeOrder(typeName: string): number {
  const index = SYSTEM_TYPE_ORDER.indexOf(typeName);
  return index === -1 ? SYSTEM_TYPE_ORDER.length : index;
}

export function getTypeLabel(typeName: string): string {
  return `${typeName.charAt(0).toUpperCase()}${typeName.slice(1)}s`;
}

export function getTypeIcon(iconName: string): LucideIcon {
  return TYPE_ICONS[iconName] ?? File;
}

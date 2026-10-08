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

export function getTypeIcon(iconName: string): LucideIcon {
  return TYPE_ICONS[iconName] ?? File;
}

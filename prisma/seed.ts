import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};
const PASSWORD_SALT_ROUNDS = 12;

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
] as const;

type SystemTypeName = (typeof SYSTEM_ITEM_TYPES)[number]["name"];

interface SeedItem {
  type: SystemTypeName;
  title: string;
  description: string;
  content?: string;
  language?: string;
  url?: string;
  isFavorite?: boolean;
}

interface SeedCollection {
  name: string;
  description: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    items: [
      {
        type: "snippet",
        title: "useDebounce Hook",
        description: "Debounce a fast-changing value such as search input",
        language: "typescript",
        isFavorite: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
      },
      {
        type: "snippet",
        title: "Typed Context Provider",
        description: "Context provider with a hook that throws outside the provider",
        language: "typescript",
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}`,
      },
      {
        type: "snippet",
        title: "cn Class Name Helper",
        description: "Merge conditional Tailwind classes without conflicts",
        language: "typescript",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
    items: [
      {
        type: "prompt",
        title: "Code Review Prompt",
        description: "Thorough review for bugs, security and performance",
        isFavorite: true,
        content:
          "Review the following code. List bugs, security issues and performance problems, ordered by severity. For each, explain the impact and suggest a concrete fix with a code example. Skip style nitpicks.",
      },
      {
        type: "prompt",
        title: "Generate Documentation",
        description: "Write README-style docs for a module",
        content:
          "Write documentation for the following module. Include a one-paragraph overview, installation or setup steps, a usage example for each exported function, and a list of parameters with types and defaults. Use Markdown.",
      },
      {
        type: "prompt",
        title: "Refactoring Assistant",
        description: "Refactor code without changing behavior",
        content:
          "Refactor the following code to improve readability and maintainability without changing its behavior. Explain each change in one sentence, keep the public API the same, and point out anything that needs tests before refactoring.",
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        type: "snippet",
        title: "Next.js Dockerfile",
        description: "Multi-stage Docker build for a Next.js app",
        language: "dockerfile",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]`,
      },
      {
        type: "command",
        title: "Deploy Database Migrations",
        description: "Apply pending Prisma migrations in production",
        language: "bash",
        isFavorite: true,
        content: "npx prisma migrate deploy",
      },
      {
        type: "link",
        title: "Docker Docs",
        description: "Official Docker documentation",
        url: "https://docs.docker.com/",
      },
      {
        type: "link",
        title: "GitHub Actions Docs",
        description: "Workflows, runners and CI/CD with GitHub Actions",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        type: "command",
        title: "Undo Last Commit",
        description: "Undo the last commit but keep the changes staged",
        language: "bash",
        isFavorite: true,
        content: "git reset --soft HEAD~1",
      },
      {
        type: "command",
        title: "Clean Up Docker",
        description: "Remove stopped containers, unused networks, images and build cache",
        language: "bash",
        content: "docker system prune -a",
      },
      {
        type: "command",
        title: "Kill Process on Port",
        description: "Stop whatever is listening on port 3000",
        language: "bash",
        content: "npx kill-port 3000",
      },
      {
        type: "command",
        title: "Check Outdated Packages",
        description: "List dependencies with newer versions available",
        language: "bash",
        content: "npm outdated",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        type: "link",
        title: "Tailwind CSS Docs",
        description: "Utility classes and configuration reference",
        url: "https://tailwindcss.com/docs",
      },
      {
        type: "link",
        title: "shadcn/ui",
        description: "Accessible components to copy into your project",
        url: "https://ui.shadcn.com",
        isFavorite: true,
      },
      {
        type: "link",
        title: "Material Design 3",
        description: "Google's open-source design system",
        url: "https://m3.material.io",
      },
      {
        type: "link",
        title: "Lucide Icons",
        description: "Open-source icon library used by DevStash",
        url: "https://lucide.dev/icons",
      },
    ],
  },
];

async function seedDemoUser() {
  const password = await bcrypt.hash(DEMO_USER.password, PASSWORD_SALT_ROUNDS);
  const data = { name: DEMO_USER.name, password, isPro: false, emailVerified: new Date() };

  return prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: data,
    create: { email: DEMO_USER.email, ...data },
  });
}

// System types have no user, so the [userId, name] unique index can't be used for an upsert
async function seedSystemItemTypes(): Promise<Map<SystemTypeName, string>> {
  const typeIds = new Map<SystemTypeName, string>();

  for (const { name, icon, color } of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({ where: { name, isSystem: true, userId: null } });
    const type = existing
      ? await prisma.itemType.update({ where: { id: existing.id }, data: { icon, color } })
      : await prisma.itemType.create({ data: { name, icon, color, isSystem: true } });
    typeIds.set(name, type.id);
  }

  return typeIds;
}

async function seedCollections(userId: string, typeIds: Map<SystemTypeName, string>) {
  // Start from a clean slate so the seed can be re-run without duplicates
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });

  for (const { items, ...collection } of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        ...collection,
        userId,
        items: {
          create: items.map(({ type, ...item }) => ({
            ...item,
            userId,
            typeId: typeIds.get(type)!,
          })),
        },
      },
    });
  }
}

async function main() {
  const user = await seedDemoUser();
  const typeIds = await seedSystemItemTypes();
  await seedCollections(user.id, typeIds);

  console.log(`Seeded ${user.email} with ${SYSTEM_ITEM_TYPES.length} item types and ${COLLECTIONS.length} collections`);
}

main()
  .catch((error: unknown) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

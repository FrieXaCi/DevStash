// Mock data for the dashboard UI until the database is implemented.

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
  itemCount: number;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  typeIds: string[];
}

export interface MockItem {
  id: string;
  title: string;
  description: string;
  contentType: "text" | "file";
  content: string | null;
  url: string | null;
  fileName: string | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  typeId: string;
  collectionId: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const currentUser: MockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const itemTypes: MockItemType[] = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#3b82f6", isSystem: true, itemCount: 24 },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true, itemCount: 18 },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f97316", isSystem: true, itemCount: 15 },
  { id: "type_note", name: "Notes", icon: "StickyNote", color: "#fde047", isSystem: true, itemCount: 12 },
  { id: "type_file", name: "Files", icon: "File", color: "#6b7280", isSystem: true, itemCount: 5 },
  { id: "type_image", name: "Images", icon: "Image", color: "#ec4899", isSystem: true, itemCount: 3 },
  { id: "type_link", name: "Links", icon: "Link", color: "#10b981", isSystem: true, itemCount: 8 },
];

export const collections: MockCollection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    typeIds: ["type_snippet", "type_note", "type_link"],
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    typeIds: ["type_snippet", "type_note"],
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    typeIds: ["type_file", "type_note"],
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    typeIds: ["type_note", "type_snippet", "type_link", "type_prompt"],
  },
  {
    id: "col_git",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    typeIds: ["type_command", "type_note"],
  },
  {
    id: "col_ai",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    typeIds: ["type_prompt", "type_snippet", "type_note"],
  },
];

export const items: MockItem[] = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}`,
    url: null,
    fileName: null,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["react", "auth", "hooks"],
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `export async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res;
    await new Promise((r) => setTimeout(r, 2 ** attempt * 500));
  }
  throw new Error(\`Request failed after \${retries} attempts\`);
}`,
    url: null,
    fileName: null,
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    typeId: "type_snippet",
    collectionId: "col_react",
    tags: ["api", "fetch", "error-handling"],
    createdAt: "2026-01-12T09:30:00.000Z",
    updatedAt: "2026-01-12T09:30:00.000Z",
  },
  {
    id: "item_3",
    title: "Code Review Prompt",
    description: "Prompt for a thorough AI code review",
    contentType: "text",
    content:
      "Review the following code for bugs, security issues and performance problems. Suggest concrete improvements with code examples.",
    url: null,
    fileName: null,
    language: null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_prompt",
    collectionId: "col_ai",
    tags: ["ai", "code-review"],
    createdAt: "2026-01-10T14:00:00.000Z",
    updatedAt: "2026-01-10T14:00:00.000Z",
  },
  {
    id: "item_4",
    title: "Undo Last Commit",
    description: "Undo the last commit but keep the changes",
    contentType: "text",
    content: "git reset --soft HEAD~1",
    url: null,
    fileName: null,
    language: "bash",
    isFavorite: false,
    isPinned: false,
    typeId: "type_command",
    collectionId: "col_git",
    tags: ["git"],
    createdAt: "2026-01-09T08:15:00.000Z",
    updatedAt: "2026-01-09T08:15:00.000Z",
  },
  {
    id: "item_5",
    title: "Python List Comprehensions",
    description: "Filtering and mapping with list comprehensions",
    contentType: "text",
    content: "evens = [n * 2 for n in numbers if n % 2 == 0]",
    url: null,
    fileName: null,
    language: "python",
    isFavorite: false,
    isPinned: false,
    typeId: "type_snippet",
    collectionId: "col_python",
    tags: ["python", "lists"],
    createdAt: "2026-01-08T11:45:00.000Z",
    updatedAt: "2026-01-08T11:45:00.000Z",
  },
  {
    id: "item_6",
    title: "Big O Cheat Sheet",
    description: "Time complexity notes for common algorithms",
    contentType: "text",
    content: "## Big O\n\n- Binary search: O(log n)\n- Merge sort: O(n log n)\n- Hash map lookup: O(1)",
    url: null,
    fileName: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_note",
    collectionId: "col_interview",
    tags: ["algorithms", "interview"],
    createdAt: "2026-01-07T16:20:00.000Z",
    updatedAt: "2026-01-07T16:20:00.000Z",
  },
  {
    id: "item_7",
    title: "Project CLAUDE.md",
    description: "Context file template for AI coding assistants",
    contentType: "file",
    content: null,
    url: null,
    fileName: "CLAUDE.md",
    language: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_file",
    collectionId: "col_context",
    tags: ["ai", "context"],
    createdAt: "2026-01-06T13:00:00.000Z",
    updatedAt: "2026-01-06T13:00:00.000Z",
  },
  {
    id: "item_8",
    title: "React Docs",
    description: "Official React documentation",
    contentType: "text",
    content: null,
    url: "https://react.dev",
    fileName: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_link",
    collectionId: "col_react",
    tags: ["react", "docs"],
    createdAt: "2026-01-05T10:10:00.000Z",
    updatedAt: "2026-01-05T10:10:00.000Z",
  },
  {
    id: "item_9",
    title: "Dashboard Wireframe",
    description: "Wireframe sketch for the dashboard layout",
    contentType: "file",
    content: null,
    url: null,
    fileName: "dashboard-wireframe.png",
    language: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_image",
    collectionId: null,
    tags: ["design"],
    createdAt: "2026-01-04T15:30:00.000Z",
    updatedAt: "2026-01-04T15:30:00.000Z",
  },
];

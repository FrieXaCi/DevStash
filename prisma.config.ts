import "dotenv/config";
import { defineConfig } from "prisma/config";

// Migrations should use Neon's direct (non-pooled) connection when available
const DATABASE_URL = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: DATABASE_URL,
  },
});

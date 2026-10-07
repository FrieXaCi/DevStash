import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const [{ now, version }] = await prisma.$queryRaw<{ now: Date; version: string }[]>`
    SELECT now() AS now, version() AS version
  `;
  console.log("Connected to database");
  console.log(`  Server time: ${now.toISOString()}`);
  console.log(`  Version:     ${version}`);

  const counts = {
    users: await prisma.user.count(),
    itemTypes: await prisma.itemType.count(),
    items: await prisma.item.count(),
    collections: await prisma.collection.count(),
    tags: await prisma.tag.count(),
    accounts: await prisma.account.count(),
    sessions: await prisma.session.count(),
  };
  console.log("Table row counts:");
  console.table(counts);
}

main()
  .catch((error: unknown) => {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

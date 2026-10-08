import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";

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

  await showSystemItemTypes();
  await showDemoData();
}

async function showSystemItemTypes() {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: { name: true, icon: true, color: true, _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });
  console.log(`\nSystem item types (${types.length}):`);
  console.table(types.map(({ _count, ...type }) => ({ ...type, items: _count.items })));
}

async function showDemoData() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      collections: {
        orderBy: { createdAt: "asc" },
        include: {
          items: {
            orderBy: { createdAt: "asc" },
            select: { title: true, language: true, url: true, type: { select: { name: true } } },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error(`Demo user ${DEMO_EMAIL} not found. Run "npm run db:seed" first.`);
  }

  const passwordMatches = user.password ? await bcrypt.compare(DEMO_PASSWORD, user.password) : false;
  console.log("\nDemo user:");
  console.log(`  Email:          ${user.email}`);
  console.log(`  Name:           ${user.name}`);
  console.log(`  Pro:            ${user.isPro}`);
  console.log(`  Email verified: ${user.emailVerified?.toISOString() ?? "no"}`);
  console.log(`  Password check: ${passwordMatches ? "OK" : "FAILED"}`);

  for (const collection of user.collections) {
    console.log(`\nCollection: ${collection.name} — ${collection.description} (${collection.items.length} items)`);
    console.table(
      collection.items.map((item) => ({
        type: item.type.name,
        title: item.title,
        detail: item.url ?? item.language ?? "",
      })),
    );
  }

  if (!passwordMatches) {
    throw new Error("Demo user password does not match the seeded password");
  }
}

main()
  .catch((error: unknown) => {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

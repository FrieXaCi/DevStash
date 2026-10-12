# Current Feature: Optimize Collection Queries

## Status

In Progress

## Goals

- `findCollections` in `src/lib/db/collections.ts` no longer loads every item row (with its type) for every collection
- `itemCount` comes from Prisma `_count` instead of `items.length`
- Per-type item counts come from a single `prisma.item.groupBy` over the fetched collection IDs
- `DashboardCollection` output is unchanged: same `itemCount`, and `types` still sorted most-used first, so the dashboard cards and sidebar look the same

## Todo

- [x] Create branch `fix/collection-queries`
- [x] Select `_count: { select: { items: true } }` in `findCollections` instead of the `items` relation
- [x] Add one `groupBy({ by: ["collectionId", "typeId"], _count: true })` for the fetched collection IDs
- [x] Load the referenced item types (id, name, icon, color) in one query and build each collection's `types` sorted by count
- [x] Replace `getTypesByUsage` with the count-based sort
- [x] Verify dashboard cards and sidebar collections in the browser (border color, type icons, item counts)
- [x] Run `npm run build`

## Notes

- Source: High-severity finding from the code-scanner agent run on 2026-10-12.
- `findCollections` runs 3 times per dashboard request (dashboard recents, sidebar favorites, sidebar recents), so rows fetched currently grow with collections × items.
- Result is a fixed 3 queries per `findCollections` call (collections, groupBy, types) regardless of item count; skip the extra queries when no collections are returned.
- Out of scope: the medium/low findings (unbounded pinned items and favorite collections, unused mock data, duplicate `force-dynamic`, etc.) and user scoping (no auth yet).

## History

- **Initial Next.js setup** (Completed): Next.js 16 + React 19 + Tailwind CSS v4 via Create Next App, boilerplate removed, project context docs and CLAUDE.md added, pushed to GitHub (`main`).
- **Dashboard UI Phase 1** (Completed): ShadCN initialized (button, input), dark mode by default, `/dashboard` route with layout, top bar (logo, search, New Item button — display only), and Sidebar/Main placeholders.
- **Dashboard UI Phase 2** (Completed): ShadCN sheet, avatar, separator and tooltip added; collapsible sidebar (icon-only rail on desktop, `Sheet` drawer on mobile) with toggle in the top bar; item types linking to `/items/[type]`, favorite and recent collections, and user avatar area at the bottom, all from mock data.
- **Dashboard UI Phase 3** (Completed): ShadCN card and badge added; dashboard main area with 4 stats cards (items, collections, favorite items, favorite collections), recent collections grid with type-colored accents and type icons, pinned items, and 10 most recent items, all from mock data. Type icon map moved to shared `src/lib/item-types.ts`.
- **Prisma + Neon PostgreSQL Setup** (Completed): Prisma 7 with Neon driver adapter (`@prisma/adapter-neon`), `prisma.config.ts` loading `.env` via dotenv, initial schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth Account/Session/VerificationToken) with indexes and cascade deletes, `init` migration applied to the Neon dev branch, shared client in `src/lib/prisma.ts`, generated client in `src/generated` (gitignored, `postinstall: prisma generate`), and `npm run db:test` connection test script.
- **Dashboard Collections** (Completed): Dashboard collection cards and collection stats now load from Neon via Prisma (`src/lib/db/collections.ts`: `getRecentCollections`, `getCollectionStats`); `/dashboard` is an async, dynamically rendered server component. Card border color comes from the collection's most-used item type, with icons for every type it contains, and an empty state when there are no collections. `TypeIcon` accepts DB or mock types via a shared `ItemTypeDisplay` type. Item stats, pinned/recent items and the sidebar still use mock data, and queries are not yet scoped to a user (no auth). Verified with real data after the Seed Data feature.
- **Seed Data** (Completed): `prisma/seed.ts` seeds a demo user (`demo@devstash.io`, bcryptjs-hashed password, 12 rounds), the 7 system item types, and 5 collections with 18 items (snippets, prompts, commands, links with real URLs). Re-runnable: upserts the user, finds-or-updates system types, and recreates the demo user's collections and items. Registered as the Prisma seed command in `prisma.config.ts`; run with `npm run db:seed`. `bcryptjs` added as a dependency.
- **Dashboard Items** (Completed): Pinned items, the 10 most recent items, and item stats (total, favorites) now load from Neon via Prisma (`src/lib/db/items.ts`: `getPinnedItems`, `getRecentItems`, `getItemStats`), fetched in parallel with the collection data on `/dashboard`. Item card icon and border color come from the item's type, tags are shown as badges, the pinned section is hidden when nothing is pinned, and recent items have an empty state. Mock `getItemType` lookup removed; `formatItemDate` now takes a `Date`. Seed data has no pinned/favorite/tagged items yet, and queries are not yet scoped to a user (no auth). The sidebar still uses mock data.
- **Stats & Sidebar** (Completed): Sidebar now loads from Neon via Prisma, fetched in the async `/dashboard` layout (force-dynamic) and passed as props to the client `Sidebar`. System item types (`getSystemItemTypes` in `src/lib/db/items.ts`) show their icon, color and item count, labelled via `getTypeLabel` (`snippet` → "Snippets"), ordered by `SYSTEM_TYPE_ORDER` in `src/lib/item-types.ts`, and link to `/items/[typename]`. Collections (`getSidebarCollections` in `src/lib/db/collections.ts`, sharing a `findCollections` helper with `getRecentCollections`) are grouped under a "Collections" heading: favorites (A–Z, star icon) and the 5 most recent non-favorites (colored dot for the most-used item type), with a "View all collections" link to `/collections`; empty groups are hidden. Mock collection helpers removed from `src/lib/sidebar-data.ts`. Stats cards were already database-driven. `/items/[type]` and `/collections` pages don't exist yet, the user area still uses mock data, and queries are not yet scoped to a user (no auth).
- **Seed Favorites** (Completed): `prisma/seed.ts` items and collections accept an optional `isFavorite` flag. React Patterns and AI Workflows are favorite collections, and five items are favorites (useDebounce Hook, Code Review Prompt, Deploy Database Migrations, Undo Last Commit, shadcn/ui), so the favorite stats and sidebar stars show real data. Database re-seeded with `npm run db:seed`.
- **Add Pro Badge to Sidebar** (Completed): File and Image types in the sidebar show a subtle "PRO" badge (ShadCN `Badge`, outline variant, 10px muted text) before the item count, hidden when the sidebar is collapsed. Pro types are defined by `PRO_TYPES` / `isProType()` in `src/lib/item-types.ts`. Display only, no gating yet. Note: the spec marks Image as Pro, while the project overview lists image uploads under the Free plan; resolve before adding gating.

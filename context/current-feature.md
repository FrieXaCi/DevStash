# Current Feature

## Status

Completed

## Goals

## Todo

## Notes

## History

- **Initial Next.js setup** (Completed): Next.js 16 + React 19 + Tailwind CSS v4 via Create Next App, boilerplate removed, project context docs and CLAUDE.md added, pushed to GitHub (`main`).
- **Dashboard UI Phase 1** (Completed): ShadCN initialized (button, input), dark mode by default, `/dashboard` route with layout, top bar (logo, search, New Item button — display only), and Sidebar/Main placeholders.
- **Dashboard UI Phase 2** (Completed): ShadCN sheet, avatar, separator and tooltip added; collapsible sidebar (icon-only rail on desktop, `Sheet` drawer on mobile) with toggle in the top bar; item types linking to `/items/[type]`, favorite and recent collections, and user avatar area at the bottom, all from mock data.
- **Dashboard UI Phase 3** (Completed): ShadCN card and badge added; dashboard main area with 4 stats cards (items, collections, favorite items, favorite collections), recent collections grid with type-colored accents and type icons, pinned items, and 10 most recent items, all from mock data. Type icon map moved to shared `src/lib/item-types.ts`.
- **Prisma + Neon PostgreSQL Setup** (Completed): Prisma 7 with Neon driver adapter (`@prisma/adapter-neon`), `prisma.config.ts` loading `.env` via dotenv, initial schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth Account/Session/VerificationToken) with indexes and cascade deletes, `init` migration applied to the Neon dev branch, shared client in `src/lib/prisma.ts`, generated client in `src/generated` (gitignored, `postinstall: prisma generate`), and `npm run db:test` connection test script.
- **Dashboard Collections** (Completed): Dashboard collection cards and collection stats now load from Neon via Prisma (`src/lib/db/collections.ts`: `getRecentCollections`, `getCollectionStats`); `/dashboard` is an async, dynamically rendered server component. Card border color comes from the collection's most-used item type, with icons for every type it contains, and an empty state when there are no collections. `TypeIcon` accepts DB or mock types via a shared `ItemTypeDisplay` type. Item stats, pinned/recent items and the sidebar still use mock data, and queries are not yet scoped to a user (no auth). Verified with real data after the Seed Data feature.
- **Seed Data** (Completed): `prisma/seed.ts` seeds a demo user (`demo@devstash.io`, bcryptjs-hashed password, 12 rounds), the 7 system item types, and 5 collections with 18 items (snippets, prompts, commands, links with real URLs). Re-runnable: upserts the user, finds-or-updates system types, and recreates the demo user's collections and items. Registered as the Prisma seed command in `prisma.config.ts`; run with `npm run db:seed`. `bcryptjs` added as a dependency.

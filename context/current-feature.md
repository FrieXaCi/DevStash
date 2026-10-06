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

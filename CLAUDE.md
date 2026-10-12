# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md


## Commands

- `npm run dev` — dev server (Turbopack) on http://localhost:3000. Only one `next dev` per project can run; a second one exits with "Another next dev server is already running" and prints the existing PID.
- `npm run build` — production build (also type-checks)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit` — type-check only

## Neon MCP

When using the Neon MCP server, always target:

- **Project:** `devstash` (project_id: `raspy-pine-73941394`)
- **Branch:** `development` (branch_id: `br-proud-sound-b4f6ju5o`)

Rules:

- Always pass both `project_id` and `branch_id` explicitly on every Neon MCP call. Never leave `branch_id` out: the project's default branch is `production`, so a call without it runs against production.
- Never run queries, migrations or schema changes against the `production` branch (`br-ancient-bread-b4z2927o`) unless I explicitly ask for production in that request.
- Ask before running any destructive operation (DROP, DELETE, TRUNCATE, deleting or resetting a branch), even on `development`.
- Schema changes still go through `prisma migrate dev`, not raw SQL through MCP (see Database in coding-standards.md).





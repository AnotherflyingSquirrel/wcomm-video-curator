# Wireless Communication Tutorial Curator

A full-stack monorepo that curates high-quality YouTube tutorials for Wireless Communication topics.

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript + Prisma ORM
- Database: PostgreSQL
- Shared: Type definitions and utilities

## Monorepo layout

- `frontend/` — Vite React app (TypeScript, Tailwind)
- `backend/` — Express API (TypeScript, Prisma)
- `shared/` — Shared types and utilities

## Quick start

1. Install Node 18+.
2. Install dependencies (workspace-aware):

```bash
npm install
```

3. Configure environment files:
- Backend `backend/.env`
```
MONGO_URL=mongodb+srv://USER:PASSWORD@HOST/DB?retryWrites=true&w=majority
YOUTUBE_API_KEY=your_youtube_api_key
PORT=4000
# optional for /api/refresh
ADMIN_TOKEN=please-change-me
```
- Frontend `frontend/.env.local`
```
VITE_API_URL=http://localhost:4000
```

4. Seed topics into MongoDB:

```bash
npm -w backend run db:seed
```

5. Start dev servers (runs backend and frontend):

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## API

- `GET /api/videos?topic=&sort=&search=&page=&pageSize=`
- `GET /api/videos/:id`
- `GET /api/topics`
- `POST /api/refresh` (requires ADMIN_TOKEN when set)

## Deployment

- Frontend: Vercel (VITE_API_URL should point to backend URL)
- Backend: Railway or Render
- Database: Railway PostgreSQL or Supabase

See package-level READMEs or scripts for details.
# AquaKeeper — Architecture

## Overview

AquaKeeper follows a classic client-server architecture with a React single-page application (SPA) frontend and a Node.js/Express REST API backend. In production the backend will connect to a Supabase-hosted PostgreSQL database and the Gemini AI API; in Step 1 all data is mocked client-side.

```
┌──────────────────────────────────────────────────────────┐
│                       Browser                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  React SPA (Vite + TypeScript + Tailwind CSS)      │  │
│  │  ├── React Router (client-side routing)            │  │
│  │  ├── Recharts (data visualisation)                 │  │
│  │  ├── Lucide React (iconography)                    │  │
│  │  └── Contexts (UserMode, Toast)                    │  │
│  └───────────────────┬────────────────────────────────┘  │
│                      │ HTTP (fetch / axios)               │
└──────────────────────┼───────────────────────────────────┘
                       │
┌──────────────────────┼───────────────────────────────────┐
│                Express API Server                         │
│  ├── Helmet (security headers)                           │
│  ├── CORS (origin allowlist)                             │
│  ├── express-rate-limit (throttling)                     │
│  ├── Zod (request validation)                            │
│  ├── Custom middleware (logger, error, notFound)         │
│  └── Route modules (/api/*)                              │
│         ├── health  ─── returns system status             │
│         ├── auth    ─── 501 (Step 3)                      │
│         ├── aquariums ─ 501 (Step 4)                      │
│         ├── fish    ─── 501 (Step 5)                      │
│         ├── water-readings ─ 501 (Step 5)                 │
│         ├── reminders ─ 501 (Step 6)                      │
│         ├── chat    ─── 501 (Step 7)                      │
│         ├── fish-analysis ─ 501 (Step 8)                  │
│         └── store   ─── 501 (Step 10)                     │
└──────────────────────┬───────────────────────────────────┘
                       │  (future)
┌──────────────────────┼───────────────────────────────────┐
│            Supabase / PostgreSQL                          │
│  ├── Users table                                         │
│  ├── Aquariums table                                     │
│  ├── Fish table                                          │
│  ├── WaterReadings table                                 │
│  ├── Reminders table                                     │
│  ├── Alerts table                                        │
│  ├── StoreItems table                                    │
│  └── Row Level Security policies                         │
└──────────────────────────────────────────────────────────┘
```

---

## Frontend Structure

```
client/src/
├── assets/           # Static images and media
├── components/
│   ├── common/       # Reusable UI: Header, Sidebar, MobileNav, Toast, Modal, Skeleton, ErrorBound
│   ├── dashboard/    # (future) Dashboard-specific widgets
│   ├── forms/        # (future) Shared form components
│   └── layout/       # AppLayout — sidebar + header + outlet wrapper
├── contexts/         # React Context providers (UserMode)
├── hooks/            # (future) Custom React hooks
├── layouts/          # (future) Alternative layout shells
├── lib/              # (future) Third-party library wrappers
├── pages/            # One file per route (LandingPage, Dashboard, etc.)
├── services/         # (future) API client functions
├── types/            # TypeScript interfaces and type aliases
└── utils/            # Mock data, helper functions
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| Tailwind CSS (v3) | Utility-first approach enables rapid iteration without context-switching to CSS files |
| Glassmorphism utilities | Custom CSS classes (`.glass-panel`, `.glass-card`, `.glass-input`) keep the aquatic theme consistent |
| `UserModeContext` | A single React Context allows the dashboard to adapt content dynamically without prop drilling |
| `ToastProvider` | Global notification system accessible from any component via `useToast()` hook |
| Mock data in `utils/mockData.ts` | Centralised, clearly-named file avoids scattering test data across pages |

---

## Backend Structure

```
server/src/
├── config/           # (future) Database, Supabase, Gemini client config
├── controllers/      # (future) Request handler logic
├── middleware/
│   ├── error.ts      # Centralised error handler (Zod-aware)
│   ├── logger.ts     # HTTP request/response logger
│   └── notFound.ts   # 404 catch-all for unknown API paths
├── routes/
│   ├── api.ts        # Root router — mounts all sub-routers
│   ├── health.ts     # GET /api/health
│   ├── auth.ts       # (stub) POST /api/auth/*
│   ├── aquariums.ts  # (stub) CRUD /api/aquariums
│   ├── fish.ts       # (stub) CRUD /api/fish
│   ├── waterReadings.ts # (stub) CRUD /api/water-readings
│   ├── reminders.ts  # (stub) CRUD /api/reminders
│   ├── chat.ts       # (stub) POST /api/chat
│   ├── fishAnalysis.ts # (stub) POST /api/fish-analysis
│   └── store.ts      # (stub) CRUD /api/store
├── services/         # (future) Business logic layer
├── types/            # (future) Backend-specific TypeScript types
├── utils/            # (future) Shared utilities
├── validators/       # (future) Zod schemas for request payloads
├── app.ts            # Express application configuration
└── server.ts         # Server bootstrap and port binding
```

### Middleware Pipeline

```
Request → Helmet → CORS → Rate Limiter → JSON Parser → Logger → Routes → Not Found → Error Handler → Response
```

---

## Data Flow (Future State)

1. User interacts with React UI → triggers `fetch()` to Express API
2. Express validates request body with Zod schema
3. Controller calls service layer
4. Service layer queries Supabase PostgreSQL via client SDK
5. Response flows back through middleware pipeline as JSON
6. AI features route through Gemini API before returning to client

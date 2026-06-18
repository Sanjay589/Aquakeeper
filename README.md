# 🐠 AquaKeeper

AI-powered aquarium care and pet-store management platform.

AquaKeeper helps beginners learn to set up aquariums, experienced hobbyists track water chemistry across multiple tanks, and pet-store professionals manage live animal inventory — all in one unified interface.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, React Router, Recharts, Lucide React |
| **Backend** | Node.js, Express, TypeScript, Zod, Helmet, CORS, express-rate-limit, dotenv |
| **Database** | Supabase / PostgreSQL *(planned — Step 2)* |
| **AI** | Google Gemini API *(planned — Step 7)* |
| **Quality** | ESLint, Prettier |

---

## Folder Structure

```
aquakeeper/
├── client/                  # React SPA
│   ├── src/
│   │   ├── assets/          # Static media
│   │   ├── components/
│   │   │   ├── common/      # Header, Sidebar, MobileNav, Toast, Modal, Skeleton, ErrorBound
│   │   │   ├── dashboard/   # (future) Dashboard widgets
│   │   │   ├── forms/       # (future) Shared form components
│   │   │   └── layout/      # AppLayout wrapper
│   │   ├── contexts/        # UserModeContext
│   │   ├── hooks/           # (future) Custom hooks
│   │   ├── layouts/         # (future) Alt layouts
│   │   ├── lib/             # (future) Library wrappers
│   │   ├── pages/           # All route pages
│   │   ├── services/        # (future) API clients
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Mock data, helpers
│   ├── .env.example
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                  # Express API
│   ├── src/
│   │   ├── config/          # (future) DB config
│   │   ├── controllers/     # (future) Handlers
│   │   ├── middleware/       # logger, error, notFound
│   │   ├── routes/          # health + stub feature routes
│   │   ├── services/        # (future) Business logic
│   │   ├── types/           # (future) Backend types
│   │   ├── utils/           # (future) Utilities
│   │   ├── validators/      # (future) Zod schemas
│   │   ├── app.ts           # Express config
│   │   └── server.ts        # Bootstrap
│   └── .env.example
├── docs/
│   ├── PROJECT_SCOPE.md
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT_PLAN.md
├── supabase/                # (future) Migrations, seed data
├── .gitignore
└── README.md
```

---

## Requirements

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd aquakeeper

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

## Environment Setup

```bash
# Client — copy and edit as needed
cp client/.env.example client/.env

# Server — copy and edit as needed
cp server/.env.example server/.env
```

### Server `.env` variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Express server port |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin |
| `NODE_ENV` | `development` | Runtime environment |

---

## Development Commands

```bash
# Start frontend dev server (port 5173)
cd client
npm run dev

# Start backend dev server (port 5000)
cd server
npm run dev
```

---

## Build Commands

```bash
# Build frontend for production
cd client
npm run build

# Build backend TypeScript
cd server
npm run build
```

---

## Linting

```bash
# Lint frontend
cd client
npm run lint

# Lint backend
cd server
npm run lint
```

---

## API Endpoints (Step 1)

| Method | Path | Status |
|---|---|---|
| `GET` | `/api/health` | ✅ Returns `{ success: true, message, timestamp }` |
| `*` | `/api/auth/*` | 🚧 501 Not Implemented |
| `*` | `/api/aquariums/*` | 🚧 501 Not Implemented |
| `*` | `/api/fish/*` | 🚧 501 Not Implemented |
| `*` | `/api/water-readings/*` | 🚧 501 Not Implemented |
| `*` | `/api/reminders/*` | 🚧 501 Not Implemented |
| `*` | `/api/chat/*` | 🚧 501 Not Implemented |
| `*` | `/api/fish-analysis/*` | 🚧 501 Not Implemented |
| `*` | `/api/store/*` | 🚧 501 Not Implemented |

---

## Current Limitations (Step 1)

- All data is mock — hardcoded in `client/src/utils/mockData.ts`
- Authentication is bypassed — a development pre-auth user is loaded automatically
- Form submissions show toast feedback but do not persist to any database
- AI Assistant returns scripted canned responses (Gemini not connected)
- Fish Photo Check runs a timer simulation and returns a hardcoded diagnosis
- Backend feature endpoints return `501 Not Implemented`

---

## Next Development Step

**Step 2: Database Design & Supabase Integration** — design the PostgreSQL schema, configure Supabase, implement Row Level Security, and connect the backend service layer to persistent storage.

See [docs/DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md) for the full 12-step roadmap.
# Aquakeeper

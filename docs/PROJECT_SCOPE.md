# AquaKeeper — Project Scope

## What is Included

### Frontend Application (React + Vite + TypeScript + Tailwind CSS)
- Responsive, aquatic-themed dark UI across all screen sizes
- Public pages: Landing Page, Login, Register, About, 404 Not Found
- Authenticated app pages (development pre-auth):
  - Dashboard with mock water quality charts, health scores, and aquarium cards
  - Beginner Guide with interactive step checklist
  - My Aquariums — list, add, and inspect tank configuration
  - Aquarium Details — tabbed view (overview, fish stock, water readings)
  - My Fish — catalogue all inhabitants across tanks
  - Water Quality — parameter recorder with beginner feedback
  - Maintenance — feeding schedule planner and task checklist
  - AI Assistant — mock chat interface with predefined questions
  - Fish Photo Check — drag-and-drop upload with mock visual diagnosis
  - Alerts — system parameter warning logs
  - Pet Store Pro — inventory dashboard with stock filters
  - Profile — user account editor
  - Settings — unit scale and notification configuration
- User Mode Selector (Beginner / Aquarium Owner / Pet Store Professional)
- Dynamic dashboard content adapts to selected user mode
- Toast notifications, reusable Modal dialogs, Skeleton loaders, ErrorBoundary
- Mobile navigation drawer + responsive desktop sidebar

### Backend Application (Node.js + Express + TypeScript)
- `GET /api/health` endpoint returning JSON status and ISO timestamp
- Helmet security headers
- CORS configured from `CLIENT_URL` environment variable
- JSON body parser with 10MB size limit
- API rate limiting (100 requests / 15 min per IP)
- Custom request logging middleware
- Centralised error-handling middleware (formats Zod validation errors)
- Not-Found middleware for unknown API paths
- Empty route modules (returning `501 Not Implemented`) for all planned feature endpoints

### Documentation
- `docs/PROJECT_SCOPE.md` (this file)
- `docs/ARCHITECTURE.md`
- `docs/DEVELOPMENT_PLAN.md`
- `README.md`

### Environment Configuration
- `client/.env.example`
- `server/.env.example`

---

## What is Explicitly Excluded from Step 1

| Feature | Reason for Exclusion |
|---|---|
| Supabase / PostgreSQL integration | Planned for Step 2 |
| Real authentication (JWT, sessions) | Planned for Step 3 |
| Gemini AI API calls | Planned for Step 7 |
| Fish photo AI analysis (real) | Planned for Step 8 |
| Push / email notifications | Planned for Step 9 |
| Production deployment | Planned for Step 12 |
| Real database CRUD operations | Steps 2–6 |
| Payment / billing | Out of scope entirely |
| Native mobile application | Out of scope entirely |

---

## Known Step 1 Limitations

1. All data is mock (hardcoded in `client/src/utils/mockData.ts`)
2. All authenticated pages are accessible without login (development pre-auth user)
3. Form submissions show toast feedback but do not persist
4. The AI Assistant generates canned scripted responses, not real Gemini output
5. The Fish Photo Check runs a mock timer and returns a hardcoded report
6. Backend feature routes return `501 Not Implemented`

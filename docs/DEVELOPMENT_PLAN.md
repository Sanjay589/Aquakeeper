# AquaKeeper — Development Plan

This document outlines the twelve planned development steps to bring AquaKeeper from foundation to production-ready status.

---

## Step 1: Project Foundation & Frontend Interface ✅ (Current)
- Initialise project structure (client + server + docs)
- Configure build tooling (Vite, TypeScript, Tailwind, ESLint, Prettier)
- Build all frontend pages with mock data
- Create Express server with health endpoint and stub routes
- Write project documentation

## Step 2: Database Design & Supabase Integration
- Design PostgreSQL schema (users, aquariums, fish, water_readings, reminders, alerts, store_items)
- Set up Supabase project and configure client SDK
- Implement Row Level Security (RLS) policies
- Create database migration scripts
- Connect backend services to Supabase

## Step 3: Authentication & Authorisation
- Implement Supabase Auth (email/password, OAuth providers)
- Add JWT verification middleware to Express
- Create login, register, and password reset flows
- Protect private routes with auth guards
- Implement role-based access control (beginner, owner, store manager)

## Step 4: Aquarium Management CRUD
- Build API endpoints for creating, reading, updating, and deleting aquariums
- Connect frontend forms to real API calls
- Implement Zod validation schemas for aquarium payloads
- Add optimistic UI updates with error rollback

## Step 5: Fish & Water Quality Management
- Build CRUD endpoints for fish inventory and water readings
- Connect Water Quality recorder to database persistence
- Implement historical water parameter charting from real data
- Add fish compatibility checking logic

## Step 6: Reminders, Maintenance & Alerts
- Build reminder scheduling API with recurrence logic
- Implement alert generation based on water parameter thresholds
- Create notification dispatch system (in-app alerts)
- Connect maintenance checklists to persistent storage

## Step 7: AI Assistant Integration (Gemini)
- Configure Gemini API client in backend
- Build chat endpoint with conversation context management
- Implement aquarium-specific context injection (tank parameters, fish stock)
- Add source citation formatting to AI responses
- Rate-limit AI requests per user

## Step 8: Fish Photo Analysis (Gemini Vision)
- Build image upload endpoint with file validation
- Integrate Gemini Vision API for visual fish health analysis
- Structure diagnostic report generation
- Implement analysis history storage
- Add confidence scoring and disclaimer generation

## Step 9: Notifications & Real-time Updates
- Implement push notification system
- Add email notification support for critical alerts
- Build real-time parameter monitoring with Supabase Realtime
- Create notification preference management

## Step 10: Pet Store Management
- Build full store inventory CRUD with bulk operations
- Implement low-stock alert automation
- Add supplier management and order tracking
- Create sales reporting and analytics views

## Step 11: Testing, Performance & Accessibility
- Write unit tests for backend services and controllers
- Write integration tests for API endpoints
- Write component tests for critical frontend flows
- Perform accessibility audit (WCAG 2.1 AA)
- Optimise bundle size, lazy loading, and Core Web Vitals

## Step 12: Deployment & Production Hardening
- Configure CI/CD pipeline (GitHub Actions)
- Set up staging and production environments
- Implement logging and monitoring (error tracking)
- Configure CDN and asset optimisation
- Write operational runbooks
- Perform security audit and penetration testing
- Launch production deployment

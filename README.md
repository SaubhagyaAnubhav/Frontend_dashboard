# Hintro Dashboard

> A production-quality frontend application built as part of the Hintro technical assignment.
> Demonstrates scalable React architecture, clean API integration, responsive UI, and pixel-perfect Figma implementation.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-passing-4B32C3?style=flat-square&logo=eslint&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Design Decisions](#design-decisions)

---

## Overview

Hintro Dashboard is a single-page React application that allows sales professionals to monitor call performance, review session history, and manage their Hintro account. The app connects to a hosted mock REST API and renders two distinct states:

- **Empty state (User 1)** — A new user with no call history, guiding them toward their first session.
- **Filled state (User 2)** — An active user with real API-driven statistics and a grouped call history.

The UI is implemented pixel-perfectly from Figma designs, with full responsiveness across mobile, tablet, and desktop viewports.

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone the repository
git clone https://github.com/your-username/hintro-dashboard.git
cd hintro-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

No backend setup is required. The app connects to the hosted mock API at `https://mock-backend-hintro.vercel.app` by default.

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI Library | React 19 | Concurrent rendering, stable ecosystem |
| Build Tool | Vite 8 | Sub-second HMR, native ESM |
| Routing | React Router DOM 7 | Declarative, nested route support |
| Styling | Tailwind CSS 4 + CSS custom properties | Utility-first with a centralized token system |
| HTTP Client | Axios | Interceptor support for header injection |
| State | React Context API + custom hooks | Lightweight — no Redux overhead for this scope |
| Animation | Framer Motion | Smooth, accessible UI transitions |
| Notifications | React Hot Toast | Lightweight toast with no configuration |
| Linting | ESLint + Prettier | Enforced code quality and consistent formatting |

---

## Project Structure

```
hintro-dashboard/
├── src/
│   ├── api/
│   │   ├── client.js               # Axios instance with x-user-id interceptor
│   │   ├── endpoints.js            # Centralised endpoint URL builders
│   │   ├── index.js                # Barrel export
│   │   └── services/
│   │       ├── authService.js      # Profile and dashboard API calls
│   │       └── callService.js      # Call stats and session history
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar/            # Navigation sidebar with anchored footer
│   │   │   ├── Header/             # Top bar with avatar dropdown
│   │   │   └── MobileNav/          # Mobile hamburger overlay
│   │   └── features/
│   │       └── FeedbackModal/      # 3-state feedback flow component
│   ├── context/
│   │   └── UserContext.jsx         # Global user ID state with localStorage sync
│   ├── hooks/
│   │   ├── useApi.js               # Generic async fetch hook
│   │   ├── useProfile.js           # User profile data
│   │   ├── useCallStats.js         # Aggregate call statistics
│   │   ├── useCallHistory.js       # Paginated call history
│   │   └── useDashboard.js         # Dashboard overview
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx       # Renders empty or filled state based on user
│   │   ├── FeedbackHistoryPage.jsx
│   │   └── StubPage.jsx
│   ├── styles/
│   │   └── theme.css               # 100+ CSS design tokens (colors, spacing, radii)
│   ├── utils/
│   │   └── constants.js            # Route constants, API config, nav item definitions
│   ├── App.jsx
│   └── main.jsx
├── hintro-api.postman_collection.json
├── .env.example
├── vite.config.js
├── tailwind.config.js
└── eslint.config.js
```

---

## Features

| Feature | Description |
|---|---|
| Pixel-perfect Figma match | Login page, dashboard, empty and filled states |
| Dual user states | Context-driven u1/u2 switcher with instant data refetch |
| Full API integration | All mock endpoints integrated with live remote backend |
| Responsive layout | Mobile overlay drawer, tablet, and desktop sidebar |
| Stat cards | Total Sessions, Average Duration, AI Used, Last Session |
| Call history grouping | Sessions grouped by ordinal date labels (e.g. `April 30th`) |
| Time formatting | Duration in `Xm Ysec`; relative dates as `X days ago` |
| Feedback modal | 3-state flow: star rating, contextual comment, thank-you screen |
| Feedback history | Submissions persisted to localStorage and viewable in-app |
| Logout confirmation | Modal dialog with session clearance and login redirect |
| Skeleton loaders | Per-component loading skeletons on all async data |
| Error handling | Graceful error states on API failures |
| Zero lint warnings | ESLint + Prettier enforced via CI-gate `npm run validate` |

---

## API Reference

**Base URL:** `https://mock-backend-hintro.vercel.app`

**Authentication:** Every request requires the header `x-user-id: u1` or `x-user-id: u2`. This is injected automatically by the Axios request interceptor.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/auth/profile` | User profile (`firstName`, `email`) |
| `GET` | `/api/auth/dashboard` | Dashboard overview (user, subscription, usage) |
| `GET` | `/api/call-sessions/stats` | Aggregate stats (totalSessions, averageDuration, etc.) |
| `GET` | `/api/call-sessions?limit=10&page=1` | Paginated call history |
| `GET` | `/api/call-sessions/:id` | Single call session detail |

### Postman Collection

A ready-to-import collection is included at the repository root.

1. Open Postman and click **Import**
2. Select `hintro-api.postman_collection.json`
3. Set the collection variable `baseUrl` to `https://mock-backend-hintro.vercel.app`
4. Set `userId` to `u1` (empty state) or `u2` (filled state)

All requests have the `x-user-id` header pre-configured.

---

## Architecture

### Data Flow

```
User switches u1 / u2
       |
       v
UserContext.setUserId()
  -- persists to localStorage
       |
       v
useApi(serviceFunction)
  -- effect dependency on userId triggers re-fetch
       |
       v
authService / callService
       |
       v
apiClient (Axios instance)
  -- request interceptor reads localStorage, attaches x-user-id header
       |
       v
https://mock-backend-hintro.vercel.app
```

### State Management Strategy

React Context is used for global user identity only. All async server state is managed locally in custom hooks built on top of a single `useApi` abstraction. This keeps components declarative and avoids unnecessary global state for data that is co-located with its consumers.

### API Layer

The API layer is split into three concerns:

- `client.js` — Axios instance configuration and interceptors
- `endpoints.js` — URL builders (no logic, easily testable)
- `services/` — One file per domain; each function returns a Promise

This separation means any service can be swapped or mocked independently.

---

## Available Scripts

```bash
npm run dev           # Start dev server at http://localhost:5173
npm run build         # Production build to /dist
npm run preview       # Preview production build locally
npm run lint          # Run ESLint
npm run lint:fix      # Run ESLint with auto-fix
npm run format        # Format with Prettier
npm run format:check  # Check formatting without writing files
npm run validate      # Run lint + format:check (CI gate)
```

---

## Environment Variables

Copy `.env.example` to `.env`. The defaults work without changes:

```env
# Hosted mock backend — works out of the box with no local setup
VITE_API_BASE_URL=https://mock-backend-hintro.vercel.app

VITE_APP_NAME=Hintro Dashboard
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DARK_MODE=false
VITE_ENABLE_ANALYTICS=false
```

To run against a local backend, set `VITE_API_BASE_URL=http://localhost:3001`.

---

## Design Decisions

**Header-based authentication**
The mock API uses `x-user-id` rather than JWT. The Axios interceptor reads from `localStorage` so all service functions remain stateless and composable.

**Ordinal date grouping**
Call sessions are grouped with labels like `April 30th` — computed client-side to match Figma without requiring backend changes to the response shape.

**Module-scope formatters**
Utility functions (`formatDuration`, `formatRelativeDate`) are defined at module scope rather than inside components. This satisfies React rendering purity and makes them independently testable.

**Feedback persistence**
Feedback is stored in `localStorage` per browser. This is intentional for the assignment scope — the architecture is ready to swap localStorage for an API call.

**No global state library**
React Context handles the one piece of truly global state (the active user ID). Everything else is local to the components that need it, which keeps the bundle small and the data flow easy to trace.

---

## Known Limitations

- Authentication is mock-only; no real token validation is performed.
- Feedback data is browser-local and not synced to a backend.
- Call session descriptions come from mock data and may not reflect real call types.

---

## Planned Improvements

- Real JWT-based authentication with refresh token support
- Unit tests with Vitest and React Testing Library
- End-to-end tests with Playwright
- Dark mode toggle with system preference detection
- Internationalisation with i18next
- Infinite scroll / cursor-based pagination for call history
- Real-time session updates via WebSockets

---

## Author

**Saubhagya Anubhav**

Built as part of the Hintro Frontend Assignment.

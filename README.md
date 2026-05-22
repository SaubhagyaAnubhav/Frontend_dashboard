# Hintro Dashboard — Frontend Assignment

A modern, responsive dashboard application for Hintro built with **React 19**, **Vite 8**, and **Tailwind CSS 4**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open **http://localhost:5173/** in your browser. No backend setup required — the app connects to the hosted mock API automatically.

---

## 🌐 Live API

| Environment | Base URL |
|---|---|
| **Production (Mock)** | `https://mock-backend-hintro.vercel.app` |
| **Local (optional)** | `http://localhost:3001` |

The app reads `VITE_API_BASE_URL` from the `.env` file. It defaults to the hosted mock backend so everything works out of the box.

---

## 📮 Postman Collection

A ready-to-import Postman collection is included at the root of the project:

```
hintro-api.postman_collection.json
```

### How to Import

1. Open **Postman**
2. Click **Import** → select `hintro-api.postman_collection.json`
3. Set the `baseUrl` variable to `https://mock-backend-hintro.vercel.app`
4. Set `userId` to `u1` (empty state) or `u2` (filled state)
5. Run any request — all endpoints require the `x-user-id` header, which is pre-configured

### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/auth/profile` | User profile (`firstName`, `email`, …) |
| `GET` | `/api/auth/dashboard` | Dashboard overview (user + subscription + usage) |
| `GET` | `/api/call-sessions/stats` | Aggregate stats (totalSessions, averageDuration, …) |
| `GET` | `/api/call-sessions?limit=10&page=1` | Paginated call history |
| `GET` | `/api/call-sessions/:id` | Single call session detail |

> **Authentication**: All endpoints require the custom request header `x-user-id: u1` or `x-user-id: u2`.

---

## 🎯 Assignment Requirements

### ✅ Completed Features

| # | Feature | Status |
|---|---|---|
| 1 | Figma pixel-perfect match (Login, Dashboard, Empty/Filled states) | ✅ |
| 2 | All 4 mock API endpoints integrated with real remote backend | ✅ |
| 3 | User 1 (u1) empty state & User 2 (u2) filled state | ✅ |
| 4 | Global CSS design system (CSS variables, no hardcoded colours) | ✅ |
| 5 | Fully responsive (mobile drawer, tablet, desktop) | ✅ |
| 6 | Time formatting — seconds → `Xm Ysec`; relative dates — `X days ago` | ✅ |
| 7 | Ordinal date labels — `April 30th` style in Recent Calls | ✅ |
| 8 | Sidebar Figma alignment — plain "Hintro" logo, anchored footer, feedback button | ✅ |
| 9 | Feedback modal (3 states: rating / textarea / thank-you) + localStorage history | ✅ |
| 10 | Logout confirmation modal ("Leaving already?") | ✅ |
| 11 | User avatar dropdown in header | ✅ |
| 12 | Auto-refetch on user switch (u1 ↔ u2) | ✅ |
| 13 | Loading skeletons and error states | ✅ |
| 14 | ESLint + Prettier (zero warnings) | ✅ |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 + CSS Variables |
| HTTP Client | Axios (with request/response interceptors) |
| State | React Context API + Custom Hooks |
| Animation | Framer Motion |
| Toast | React Hot Toast |
| Linting | ESLint + Prettier |

---

## 📁 Project Structure

```
hintro-dashboard/
├── src/
│   ├── api/                         # API layer
│   │   ├── client.js               # Axios instance (base URL, x-user-id interceptor)
│   │   ├── endpoints.js            # Centralised endpoint builders
│   │   ├── index.js                # Barrel export
│   │   └── services/
│   │       ├── authService.js      # Profile & dashboard calls
│   │       └── callService.js      # Stats & history calls
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar/            # Figma-aligned sidebar with feedback footer
│   │   │   └── Header/
│   │   └── features/
│   │       └── FeedbackModal/      # 3-state feedback modal
│   ├── context/
│   │   └── UserContext.jsx         # u1/u2 switcher + localStorage sync
│   ├── hooks/
│   │   ├── useApi.js               # Base fetching hook (re-runs on userId change)
│   │   ├── useProfile.js
│   │   ├── useCallStats.js
│   │   ├── useCallHistory.js
│   │   └── useDashboard.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx       # Empty (u1) & Filled (u2) states
│   │   ├── FeedbackHistoryPage.jsx
│   │   └── StubPage.jsx
│   ├── styles/
│   │   └── theme.css               # 100+ CSS design tokens
│   ├── utils/
│   │   └── constants.js            # API config, routes, nav items
│   ├── App.jsx
│   └── main.jsx
├── public/
├── hintro-api.postman_collection.json   # ← Postman collection (import me!)
├── .env                                 # VITE_API_BASE_URL (remote mock by default)
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── eslint.config.js
```

---

## 📱 Screens & States

### Login Page `/login`
- Email + password form with validation
- Toast notifications on error
- Redirects to `/dashboard` on success

### Dashboard `/dashboard` — User 1 (u1) — Empty State
- All stat cards show `0`
- "No Recent Calls" empty state with icon and CTA button
- Matches Figma empty state pixel-perfectly

### Dashboard `/dashboard` — User 2 (u2) — Filled State

Live data from the remote API:

| Stat Card | API Field | Example Value |
|---|---|---|
| Total Sessions | `totalSessions` | 12 |
| Average Duration | `averageDuration` (seconds → `Xm Ysec`) | 53m 7sec |
| AI Used | `totalAIInteractions` | 8 times |
| Last Session | `lastSession[0]` (relative date) | 13 days ago |

Recent Calls section:
- Grouped by date with **ordinal labels** (e.g. `April 30th`)
- Each row: circular badge with client initial, call **description**, ★★★ rating, duration, time, 3-dot menu
- Skeleton loaders while fetching

### Sidebar — Figma-Aligned
- Plain "Hintro" brand name (no box/badge)
- 5 nav items: Dashboard, Call Insights, Knowledge Base ⓘ, Prompts ⓘ, Boxy Controls ⓘ
- Footer (anchored at bottom): Feedback History, Feedback (launches modal), Upgrade pill

### Feedback Modal — 3 States
1. **Rating** — 5 outline stars
2. **Comment** — textarea label adapts to rating (1-3 → "What frustrated you?" / 4-5 → "Share the details")
3. **Thank You** — gold circle checkmark, close button

---

## 🔧 Available Scripts

```bash
npm run dev           # Start dev server → http://localhost:5173
npm run build         # Production build → /dist
npm run preview       # Preview production build
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format
npm run format:check  # Prettier check
npm run validate      # lint + format:check (CI gate)
```

---

## 🌱 Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

```env
# Remote hosted mock backend (default — works without any local setup)
VITE_API_BASE_URL=https://mock-backend-hintro.vercel.app

# App meta
VITE_APP_NAME=Hintro Dashboard
VITE_APP_VERSION=1.0.0

# Feature flags
VITE_ENABLE_DARK_MODE=false
VITE_ENABLE_ANALYTICS=false
```

---

## 🧪 Testing the Application

### Switch Between User States
The dashboard includes a user switcher banner for testing:
- **u1 — Empty**: All stats zero, no call history
- **u2 — Filled**: Real data from remote API

### Test Logout
1. Click the user avatar (top-right header)
2. Select **Log out** from the dropdown
3. Confirm in the modal ("Leaving already?")
4. Redirected to `/login`

### Test Feedback
1. Click **Feedback** in the sidebar footer
2. Select a star rating (1–5)
3. Write a comment and submit
4. View past feedback via **Feedback History** in the sidebar

### Test Responsive Design
| Viewport | Behaviour |
|---|---|
| Desktop (>1024px) | Sidebar always visible |
| Mobile (<1024px) | Hamburger icon; sidebar slides in as overlay |

---

## 🔄 API Integration Architecture

```
User Action (u1 ↔ u2 switch)
       │
       ▼
UserContext.setUserId()
  └─ localStorage.setItem('hintro_user_id', userId)
       │
       ▼
useApi(apiFunction) — effect re-runs on userId change
       │
       ▼
callService / authService
       │
       ▼
apiClient (Axios)
  └─ Request interceptor reads localStorage → sets x-user-id header
       │
       ▼
https://mock-backend-hintro.vercel.app
```

---

## 📝 Design Decisions & Assumptions

1. **Header-based auth**: The mock API authenticates via `x-user-id` header (not JWT). The Axios interceptor reads from `localStorage` so all services stay stateless.
2. **Ordinal date labels**: Call history groups are labelled `April 30th` (full month + ordinal day, no year) to match the Figma design.
3. **Client initial badge**: Each call row shows a circular badge with the first letter of the client name instead of a generic phone icon.
4. **Description-first titles**: `call.description` is shown as the primary row label, falling back to `call.client`.
5. **Module-level pure helpers**: Date/time formatting functions are defined at module scope (not inside components) to satisfy React hooks purity rules.
6. **Feedback storage**: Uses `localStorage` — feedback persists per browser, not per user account.

---

## 🐛 Known Limitations

- Authentication is mock-only (no real JWT validation)
- Feedback is browser-local only (not synced to backend)
- Call session "description" values come from the mock backend and may not reflect real call types

---

## 🔮 Future Enhancements

- [ ] Real JWT authentication
- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)
- [ ] Dark mode
- [ ] Internationalisation (i18n)
- [ ] Infinite scroll / load more in call history
- [ ] Real-time updates via WebSockets

---

## 👤 Author

Built as part of the Hintro Frontend Assignment.

---

**Built with ❤️ for Hintro**

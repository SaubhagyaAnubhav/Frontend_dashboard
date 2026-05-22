# Hintro Dashboard - Frontend Assignment

A modern, responsive dashboard application for Hintro built with React, Vite, and Tailwind CSS.

## 🚀 Live Demo

- **Local Development:** http://localhost:5173/
- **Deployed Link:** [Coming Soon]

## 📹 Video Walkthrough

[Coming Soon - Optional]

## 🎯 Assignment Requirements

### ✅ Completed Features

1. **Figma Design Implementation**
   - ✅ Pixel-perfect match with Figma designs
   - ✅ All screens implemented (Login, Dashboard, Empty/Filled states)
   - ✅ Consistent spacing, typography, and colors

2. **Mock API Integration**
   - ✅ All 4 API endpoints integrated
   - ✅ Dynamic data fetching (no hardcoded values)
   - ✅ Proper error handling and loading states

3. **Two User States**
   - ✅ User 1 (u1): Empty state with "No Recent Calls"
   - ✅ User 2 (u2): Filled state with stats and call history
   - ✅ Easy switching between users for testing

4. **Global CSS Theme**
   - ✅ CSS variables for all colors
   - ✅ No hardcoded colors
   - ✅ Consistent design system
   - ✅ 100+ theme variables

5. **Responsive Design**
   - ✅ Mobile (< 640px)
   - ✅ Tablet (640px - 1024px)
   - ✅ Desktop (> 1024px)
   - ✅ Mobile navigation drawer

6. **Time Formatting**
   - ✅ Converts seconds to "Xm Ysec" format
   - ✅ Relative dates ("2 days ago", "Yesterday")
   - ✅ Matches Figma conventions

7. **Feedback Functionality**
   - ✅ Feedback modal in sidebar
   - ✅ LocalStorage persistence
   - ✅ Feedback history page

8. **Clean Transitions**
   - ✅ Smooth animations throughout
   - ✅ Loading skeletons
   - ✅ Hover effects

## 🛠️ Tech Stack

### Core
- **React 18.3** - UI library
- **Vite 8.0** - Build tool and dev server
- **React Router DOM 7.1** - Client-side routing

### Styling
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **CSS Variables** - Global theming system
- **PostCSS** - CSS processing

### State Management
- **React Context API** - User state management
- **Custom Hooks** - Data fetching and caching

### API & Data
- **Axios** - HTTP client
- **Mock API** - http://localhost:3001

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PropTypes** - Runtime type checking

## 📁 Project Structure

```
hintro-dashboard/
├── src/
│   ├── api/                    # API layer
│   │   ├── client.js          # Axios instance with interceptors
│   │   ├── endpoints.js       # API endpoint configuration
│   │   └── services/          # API service functions
│   │       ├── authService.js
│   │       └── callService.js
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   ├── Skeleton/
│   │   │   ├── EmptyState/
│   │   │   ├── Avatar/
│   │   │   ├── Badge/
│   │   │   └── Icon/
│   │   ├── layout/            # Layout components
│   │   │   ├── Sidebar/
│   │   │   └── Header/
│   │   └── features/          # Feature-specific components
│   ├── context/               # React Context
│   │   └── UserContext.jsx   # User state (u1/u2 switching)
│   ├── hooks/                 # Custom React hooks
│   │   ├── useApi.js         # Base API hook
│   │   ├── useDashboard.js
│   │   ├── useProfile.js
│   │   ├── useCallStats.js
│   │   └── useCallHistory.js
│   ├── pages/                 # Page components
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   ├── styles/
│   │   ├── index.css         # Global styles
│   │   └── theme.css         # CSS variables
│   ├── utils/
│   │   └── constants.js      # App constants
│   ├── App.jsx               # Root component with routing
│   └── main.jsx              # Entry point
├── public/                    # Static assets
├── .env                       # Environment variables
├── .env.example              # Environment template
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Mock API server running on http://localhost:3001

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hintro-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173/
   ```

### Mock API Setup

The application expects a mock API server running on `http://localhost:3001` with the following endpoints:

- `GET /health` - Health check
- `GET /api/auth/profile` - User profile
- `GET /api/auth/dashboard` - Dashboard data
- `GET /api/call-sessions/stats` - Call statistics
- `GET /api/call-sessions?limit=10` - Call history

All endpoints require `x-user-id` header with value `u1` or `u2`.

## 📱 Features & Screens

### 1. Login Page (`/login`)
- Clean email/password form
- Form validation
- Loading states
- Toast notifications
- Redirects to dashboard on success

### 2. Dashboard Page (`/dashboard`)

#### Empty State (User 1 - u1)
- All stats show 0
- "No Recent Calls" message
- Clean empty state design
- Call-to-action button

#### Filled State (User 2 - u2)
- 4 stat cards:
  - Total Sessions
  - Average Duration (formatted as "Xm Ysec")
  - AI Used (times)
  - Last Session (relative date)
- Recent calls list with:
  - Call name
  - Star rating
  - Time
  - Three-dot menu
- Real-time data from API

### 3. Sidebar Navigation
- Logo section
- Navigation menu:
  - Dashboard (active)
  - Call Insights
  - Knowledge Base
  - Prompts
  - Busy Controls
- Feedback section
- User profile
- Logout button

### 4. Responsive Design
- **Desktop (> 1024px)**: Full sidebar visible
- **Tablet (640px - 1024px)**: Collapsible sidebar
- **Mobile (< 640px)**: Hamburger menu with overlay

### 5. Logout Modal
- "Leaving already?" confirmation
- Cancel and Log out buttons
- Matches Figma design

## 🎨 Design System

### Colors
All colors are defined as CSS variables in `src/styles/theme.css`:

- **Primary**: `--color-primary` (#6366f1)
- **Neutral**: `--color-neutral-*` (50-900)
- **Semantic**: Success, Warning, Error, Info
- **Stat Cards**: Red, Blue, Green, Purple

### Typography
- **Font Family**: Inter
- **Sizes**: 12px - 36px (defined as CSS variables)
- **Weights**: 400, 500, 600, 700

### Spacing
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px
- **Consistent**: All spacing uses Tailwind classes

### Components
- **Buttons**: 5 variants, 3 sizes
- **Cards**: Composition pattern
- **Modals**: Accessible with focus trap
- **Empty States**: 3 variants
- **Skeletons**: Loading placeholders

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🧪 Testing the Application

### Test User Switching
1. Login to the dashboard
2. You'll see two buttons at the top: "User 1 (Empty)" and "User 2 (Filled)"
3. Click to switch between users
4. Data automatically refetches

### Test Empty State (u1)
1. Click "User 1 (Empty)"
2. All stats should show 0
3. "No Recent Calls" message appears
4. Empty state design matches Figma

### Test Filled State (u2)
1. Click "User 2 (Filled)"
2. Stats cards populate with data
3. Recent calls list appears
4. Time formatting: "14m 22sec"
5. Relative dates: "2 days ago"

### Test Responsive Design
1. Resize browser window
2. Mobile: Hamburger menu appears
3. Tablet: Sidebar collapses
4. Desktop: Full sidebar visible

### Test Logout
1. Click "Logout" in sidebar
2. Confirmation modal appears
3. Click "Log out" to confirm
4. Redirects to login page

## 📊 API Integration

### Endpoints Used

1. **Profile** - `GET /api/auth/profile`
   - Returns user information
   - Used in: Sidebar, Header

2. **Dashboard** - `GET /api/auth/dashboard`
   - Returns dashboard overview
   - Used in: Dashboard stats

3. **Call Stats** - `GET /api/call-sessions/stats`
   - Returns call statistics
   - Used in: Stat cards

4. **Call History** - `GET /api/call-sessions?limit=10`
   - Returns recent calls
   - Used in: Recent calls list

### Data Flow

```
User Action → Custom Hook → API Service → Axios Client → Mock API
                ↓
            Loading State
                ↓
            Data/Error State
                ↓
            UI Update
```

### Auto-Refetch on User Switch
When switching between u1 and u2:
1. UserContext updates userId
2. All hooks detect the change
3. Automatic refetch with new userId
4. UI updates with new data

## 🎯 Key Features

### 1. Clean Architecture
- Separation of concerns
- Reusable components
- Custom hooks for data fetching
- Centralized API layer

### 2. Performance
- Lazy loading
- Memoization where needed
- Efficient re-renders
- Skeleton loading states

### 3. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management

### 4. Developer Experience
- Hot Module Replacement (HMR)
- ESLint + Prettier
- Clear folder structure
- Comprehensive documentation

## 🐛 Known Issues & Limitations

1. **Mock API Dependency**: Requires mock API server to be running
2. **Authentication**: Mock authentication (no real JWT validation)
3. **Feedback Storage**: Uses localStorage (not persistent across devices)

## 🔮 Future Enhancements

- [ ] Real authentication with JWT
- [ ] Backend API integration
- [ ] Unit and integration tests
- [ ] E2E tests with Playwright
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Advanced filtering and search
- [ ] Export data functionality
- [ ] Real-time updates with WebSockets

## 📝 Assumptions

1. **Mock API**: Assumes mock API follows the provided Postman collection
2. **User IDs**: Only two users (u1, u2) as per assignment
3. **Time Format**: API returns time in seconds
4. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
5. **Screen Sizes**: Optimized for 320px - 1920px width

## 🤝 Contributing

This is an assignment project. For any questions or issues, please contact the developer.

## 📄 License

This project is created as part of a frontend assignment for Hintro.

## 👤 Author

**Your Name**
- GitHub: [@yourusername]
- Email: your.email@example.com

## 🙏 Acknowledgments

- Figma design provided by Hintro
- Mock API documentation provided by Hintro
- Assignment requirements by Hintro team

---

**Built with ❤️ for Hintro Frontend Assignment**

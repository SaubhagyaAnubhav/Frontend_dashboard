
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://mock-backend-hintro.vercel.app',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
}


export const API_ENDPOINTS = {
  HEALTH: '/health',
  AUTH: {
    PROFILE: '/api/auth/profile',
    DASHBOARD: '/api/auth/dashboard',
  },
  CALL_SESSIONS: {
    STATS: '/api/call-sessions/stats',
    HISTORY: '/api/call-sessions',
  },
}


export const USER_IDS = {
  EMPTY_STATE: 'u1',
  FILLED_STATE: 'u2',
}


export const STORAGE_KEYS = {
  USER_ID: 'hintro_user_id',
  FEEDBACK: 'hintro_feedback',
  THEME: 'hintro_theme',
  AUTH_TOKEN: 'hintro_auth_token',
}


export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CALL_INSIGHTS: '/call-insights',
  KNOWLEDGE_BASE: '/knowledge-base',
  PROMPTS: '/prompts',
  BOXY_CONTROLS: '/boxy-controls',
}


export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'dashboard',
  },
  {
    id: 'call-insights',
    label: 'Call Insights',
    path: ROUTES.CALL_INSIGHTS,
    icon: 'phone',
  },
  {
    id: 'knowledge-base',
    label: 'Knowledge Base',
    path: ROUTES.KNOWLEDGE_BASE,
    icon: 'book',
    hasInfo: true,
  },
  {
    id: 'prompts',
    label: 'Prompts',
    path: ROUTES.PROMPTS,
    icon: 'message',
    hasInfo: true,
  },
  {
    id: 'boxy-controls',
    label: 'Boxy Controls',
    path: ROUTES.BOXY_CONTROLS,
    icon: 'settings',
    hasInfo: true,
  },
]


export const STAT_TYPES = {
  TOTAL_SESSIONS: 'total_sessions',
  AVERAGE_DURATION: 'average_duration',
  AI_USED: 'ai_used',
  LAST_SESSION: 'last_session',
}


export const TIME_FORMATS = {
  SHORT: 'short',
  LONG: 'long',
  FULL: 'full',
}


export const DATE_FORMATS = {
  SHORT: 'MMM DD', // "Jan 15"
  MEDIUM: 'MMM DD, YYYY', // "Jan 15, 2024"
  LONG: 'MMMM DD, YYYY', // "January 15, 2024"
  FULL: 'MMMM DD, YYYY HH:mm', // "January 15, 2024 14:30"
  RELATIVE: 'relative', // "2 days ago"
}


export const FEEDBACK_RATINGS = [
  { value: 1, emoji: '😞', label: 'Very Dissatisfied' },
  { value: 2, emoji: '😕', label: 'Dissatisfied' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '🙂', label: 'Satisfied' },
  { value: 5, emoji: '😄', label: 'Very Satisfied' },
]


export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
  DEFAULT_PAGE: 1,
}


export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}


export const ANIMATION = {
  FAST: 150,
  BASE: 200,
  SLOW: 300,
  SLOWER: 500,
}


export const TOAST_CONFIG = {
  DURATION: 3000,
  POSITION: 'top-right',
  SUCCESS_ICON: '✓',
  ERROR_ICON: '✕',
  WARNING_ICON: '⚠',
  INFO_ICON: 'ℹ',
}


export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  TIMEOUT: 'Request timeout. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
}


export const SUCCESS_MESSAGES = {
  FEEDBACK_SUBMITTED: 'Thank you for your feedback!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
}


export const EMPTY_STATE_MESSAGES = {
  NO_CALLS: {
    title: 'No Recent Calls',
    description: 'Connect your phone or start a new meeting to see your call history here.',
    action: 'Start a Call',
  },
  NO_STATS: {
    title: 'No Statistics Yet',
    description: 'Your call statistics will appear here once you start making calls.',
  },
  NO_FEEDBACK: {
    title: 'No Feedback History',
    description: 'Your feedback submissions will appear here.',
  },
}


export const APP_META = {
  NAME: import.meta.env.VITE_APP_NAME || 'Hintro Dashboard',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: 'AI-powered call insights and analytics dashboard',
  AUTHOR: 'Hintro',
  COPYRIGHT: `© ${new Date().getFullYear()} Hintro. Made in India 🇮🇳`,
}


export const FEATURES = {
  DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  USER_SWITCHER: import.meta.env.MODE === 'development', // Only in dev mode
}

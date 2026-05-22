/**
 * API Endpoints Configuration
 *
 * Centralized endpoint definitions
 * Benefits:
 * - Single source of truth
 * - Easy to update
 * - Type-safe with JSDoc
 * - No hardcoded URLs in services
 */

import { API_ENDPOINTS } from '@/utils/constants'

/**
 * Auth Endpoints
 */
export const authEndpoints = {
  /**
   * Get user profile
   * @returns {string} /api/auth/profile
   */
  profile: () => API_ENDPOINTS.AUTH.PROFILE,

  /**
   * Get dashboard data (user + subscription + usage)
   * @returns {string} /api/auth/dashboard
   */
  dashboard: () => API_ENDPOINTS.AUTH.DASHBOARD,
}

/**
 * Call Session Endpoints
 */
export const callEndpoints = {
  /**
   * Get call statistics
   * @returns {string} /api/call-sessions/stats
   */
  stats: () => API_ENDPOINTS.CALL_SESSIONS.STATS,

  /**
   * Get call history with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of sessions to return
   * @param {number} params.page - Page number
   * @returns {string} /api/call-sessions?limit=10&page=1
   */
  history: (params = {}) => {
    const queryParams = new URLSearchParams()

    if (params.limit) {
      queryParams.append('limit', params.limit)
    }
    if (params.page) {
      queryParams.append('page', params.page)
    }

    const queryString = queryParams.toString()
    return `${API_ENDPOINTS.CALL_SESSIONS.HISTORY}${queryString ? `?${queryString}` : ''}`
  },

  /**
   * Get single call session by ID
   * @param {string} sessionId - Call session ID
   * @returns {string} /api/call-sessions/:id
   */
  session: (sessionId) => `${API_ENDPOINTS.CALL_SESSIONS.HISTORY}/${sessionId}`,
}

/**
 * Health Check Endpoint
 */
export const healthEndpoint = {
  /**
   * Health check
   * @returns {string} /health
   */
  check: () => API_ENDPOINTS.HEALTH,
}

/**
 * All endpoints grouped
 */
export const endpoints = {
  auth: authEndpoints,
  calls: callEndpoints,
  health: healthEndpoint,
}

export default endpoints

/**
 * Call Service
 *
 * Handles all call session-related API calls
 * - Get call statistics
 * - Get call history with pagination
 * - Get single call session
 */

import { get } from '../client'
import { callEndpoints } from '../endpoints'
import { PAGINATION } from '@/utils/constants'

/**
 * Call Service Object
 */
const callService = {
  /**
   * Get call statistics
   *
   * @returns {Promise<Object>} Call statistics
   * @property {number} totalSessions - Total number of sessions
   * @property {number} averageDuration - Average duration in seconds
   * @property {number} totalAIInteractions - Total AI interactions
   * @property {Array<string>} lastSession - Array of last session dates
   * @throws {Error} If request fails
   *
   * @example
   * const stats = await callService.getStats()
   * console.log(stats.totalSessions) // 126
   * console.log(stats.averageDuration) // 2211 seconds
   */
  getStats: async () => {
    try {
      const data = await get(callEndpoints.stats())
      return data
    } catch (error) {
      console.error('Failed to fetch call stats:', error)
      throw error
    }
  },

  /**
   * Get call history with pagination
   *
   * @param {Object} params - Query parameters
   * @param {number} [params.limit=10] - Number of sessions per page
   * @param {number} [params.page=1] - Page number
   * @returns {Promise<Object>} Call history with pagination
   * @property {Array<Object>} callSessions - Array of call sessions
   * @property {Object} pagination - Pagination metadata
   * @throws {Error} If request fails
   *
   * @example
   * const history = await callService.getHistory({ limit: 5, page: 1 })
   * console.log(history.callSessions.length) // 5
   * console.log(history.pagination.totalCount) // 50
   */
  getHistory: async (params = {}) => {
    try {
      const queryParams = {
        limit: params.limit || PAGINATION.DEFAULT_LIMIT,
        page: params.page || PAGINATION.DEFAULT_PAGE,
      }

      const data = await get(callEndpoints.history(queryParams))
      return data
    } catch (error) {
      console.error('Failed to fetch call history:', error)
      throw error
    }
  },

  /**
   * Get single call session by ID
   *
   * @param {string} sessionId - Call session ID
   * @returns {Promise<Object>} Call session details
   * @throws {Error} If request fails
   *
   * @example
   * const session = await callService.getSession('cs1')
   * console.log(session.client) // "Acme Corp"
   * console.log(session.description) // "Product demo"
   */
  getSession: async (sessionId) => {
    try {
      if (!sessionId) {
        throw new Error('Session ID is required')
      }

      const data = await get(callEndpoints.session(sessionId))
      return data
    } catch (error) {
      console.error(`Failed to fetch session ${sessionId}:`, error)
      throw error
    }
  },

  /**
   * Get all call sessions (no pagination)
   * Useful for exports or analytics
   *
   * @returns {Promise<Object>} All call sessions
   * @throws {Error} If request fails
   *
   * @example
   * const allSessions = await callService.getAllSessions()
   * console.log(allSessions.callSessions.length)
   */
  getAllSessions: async () => {
    try {
      const data = await get(
        callEndpoints.history({
          limit: PAGINATION.MAX_LIMIT,
        })
      )
      return data
    } catch (error) {
      console.error('Failed to fetch all sessions:', error)
      throw error
    }
  },
}

export default callService

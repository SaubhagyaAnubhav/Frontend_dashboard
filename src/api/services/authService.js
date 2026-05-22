/**
 * Auth Service
 *
 * Handles all authentication and user-related API calls
 * - Get user profile
 * - Get dashboard data
 */

import { get } from '../client'
import { authEndpoints } from '../endpoints'

/**
 * Auth Service Object
 */
const authService = {
  /**
   * Get user profile
   *
   * @returns {Promise<Object>} User profile data
   * @throws {Error} If request fails
   *
   * @example
   * const profile = await authService.getProfile()
   * console.log(profile.email) // "john@example.com"
   */
  getProfile: async () => {
    try {
      const data = await get(authEndpoints.profile())
      return data
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      throw error
    }
  },

  /**
   * Get dashboard data (user + subscription + usage)
   *
   * @returns {Promise<Object>} Dashboard data
   * @property {Object} user - User information
   * @property {Object|null} subscription - Subscription details
   * @property {Object} usage - Usage statistics
   * @throws {Error} If request fails
   *
   * @example
   * const dashboard = await authService.getDashboard()
   * console.log(dashboard.user.email)
   * console.log(dashboard.subscription?.plan)
   * console.log(dashboard.usage.kb_files.used)
   */
  getDashboard: async () => {
    try {
      const data = await get(authEndpoints.dashboard())
      return data
    } catch (error) {
      console.error('Failed to fetch dashboard:', error)
      throw error
    }
  },
}

export default authService

/**
 * User Context
 *
 * Manages user state (u1 or u2) across the application
 *
 * Features:
 * - User switching (u1 ↔ u2)
 * - localStorage persistence
 * - Triggers data refetch on user change
 *
 * Architecture:
 * - Context provides: { userId, setUserId, isEmptyState }
 * - Provider handles: localStorage sync, initial load
 * - Hook provides: clean API for components
 */

import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { USER_IDS, STORAGE_KEYS } from '@/utils/constants'

/**
 * User Context
 */
const UserContext = createContext(undefined)

/**
 * User Provider Component
 *
 * Wraps the app and provides user state
 */
export const UserProvider = ({ children }) => {
  // Initialize from localStorage or default to u1
  const [userId, setUserIdState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_ID)
    return stored || USER_IDS.EMPTY_STATE
  })

  /**
   * Set user ID and persist to localStorage
   */
  const setUserId = useCallback((newUserId) => {
    setUserIdState(newUserId)
    localStorage.setItem(STORAGE_KEYS.USER_ID, newUserId)

    // Log user switch in development
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('🔄 User switched:', newUserId)
    }
  }, [])

  /**
   * Toggle between u1 and u2
   */
  const toggleUser = useCallback(() => {
    const newUserId = userId === USER_IDS.EMPTY_STATE ? USER_IDS.FILLED_STATE : USER_IDS.EMPTY_STATE
    setUserId(newUserId)
  }, [userId, setUserId])

  /**
   * Check if current user is in empty state (u1)
   */
  const isEmptyState = userId === USER_IDS.EMPTY_STATE

  const value = {
    userId,
    setUserId,
    toggleUser,
    isEmptyState,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * useUser Hook
 *
 * Access user context in any component
 *
 * @returns {Object} User context
 * @property {string} userId - Current user ID (u1 or u2)
 * @property {Function} setUserId - Set user ID
 * @property {Function} toggleUser - Toggle between u1 and u2
 * @property {boolean} isEmptyState - True if user is u1
 *
 * @example
 * const { userId, toggleUser, isEmptyState } = useUser()
 *
 * // Switch user
 * toggleUser()
 *
 * // Check state
 * if (isEmptyState) {
 *   return <EmptyState />
 * }
 */
export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default UserContext

// Export UserContext as default for React DevTools
// Hooks and Provider are named exports

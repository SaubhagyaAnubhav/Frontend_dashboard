/**
 * useApi Hook
 *
 * Reusable base hook for API data fetching
 *
 * Features:
 * - Automatic loading states
 * - Error handling
 * - Refetch on user change
 * - Manual refetch
 * - Cleanup on unmount
 *
 * @param {Function} apiFunction - API service function to call
 * @param {Object} options - Hook options
 * @param {boolean} options.enabled - Whether to fetch immediately (default: true)
 * @param {Array} options.deps - Additional dependencies for refetch
 * @returns {Object} { data, loading, error, refetch }
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useUser } from '@/context/UserContext'

export const useApi = (apiFunction, options = {}) => {
  const { enabled = true, deps = [] } = options
  const { userId } = useUser()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true)

  /**
   * Fetch data from API
   */
  const fetchData = useCallback(async () => {
    if (!enabled) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const result = await apiFunction()

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setData(result)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err)
        console.error('API Error:', err)
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [apiFunction, enabled])

  /**
   * Manual refetch function
   */
  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])

  /**
   * Fetch data on mount and when dependencies change
   *
   * Note: fetchData is wrapped in useCallback and is safe to call in effect.
   * The setState calls inside fetchData are intentional and controlled.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData, userId, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useApi

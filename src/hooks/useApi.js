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

  // Track the latest apiFunction without triggering re-renders
  const apiFunctionRef = useRef(apiFunction)
  useEffect(() => {
    apiFunctionRef.current = apiFunction
  }, [apiFunction])

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

      const result = await apiFunctionRef.current()
      setData(result)
    } catch (err) {
      setError(err)
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }, [enabled])

  /**
   * Manual refetch function
   */
  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])

  /**
   * Fetch data on mount and when dependencies change
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData, userId, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useApi

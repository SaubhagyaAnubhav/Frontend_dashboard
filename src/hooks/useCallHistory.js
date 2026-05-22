/**
 * useCallHistory Hook
 *
 * Fetches call history with pagination
 * Automatically refetches when user changes or pagination params change
 *
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of sessions per page (default: 10)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Object} { data, loading, error, refetch }
 * @property {Object|null} data - Call history data
 * @property {Array} data.callSessions - Array of call sessions
 * @property {Object} data.pagination - Pagination metadata
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error object if request failed
 * @property {Function} refetch - Manual refetch function
 *
 * @example
 * function CallHistory() {
 *   const [page, setPage] = useState(1)
 *   const { data, loading, error } = useCallHistory({ limit: 10, page })
 *
 *   if (loading) return <Spinner />
 *   if (error) return <Error />
 *
 *   return (
 *     <div>
 *       {data.callSessions.map(session => (
 *         <CallItem key={session._id} session={session} />
 *       ))}
 *       <Pagination
 *         page={page}
 *         totalPages={data.pagination.totalPages}
 *         onPageChange={setPage}
 *       />
 *     </div>
 *   )
 * }
 */

import { useState, useCallback } from 'react'
import { callService } from '@/api'
import { useApi } from './useApi'
import { PAGINATION } from '@/utils/constants'

export const useCallHistory = (params = {}) => {
  const { limit = PAGINATION.DEFAULT_LIMIT, page = PAGINATION.DEFAULT_PAGE } = params

  // Use useApi with params as dependencies
  const result = useApi(() => callService.getHistory({ limit, page }), {
    deps: [limit, page],
  })

  return result
}

/**
 * useCallHistoryPaginated Hook
 *
 * Enhanced version with built-in pagination state management
 *
 * @param {number} initialLimit - Initial items per page
 * @returns {Object} Enhanced hook result with pagination helpers
 *
 * @example
 * function CallHistory() {
 *   const {
 *     data,
 *     loading,
 *     page,
 *     setPage,
 *     nextPage,
 *     prevPage,
 *     hasNextPage,
 *     hasPrevPage
 *   } = useCallHistoryPaginated(10)
 *
 *   return (
 *     <div>
 *       {data?.callSessions.map(session => <CallItem key={session._id} {...session} />)}
 *       <button onClick={prevPage} disabled={!hasPrevPage}>Previous</button>
 *       <button onClick={nextPage} disabled={!hasNextPage}>Next</button>
 *     </div>
 *   )
 * }
 */
export const useCallHistoryPaginated = (initialLimit = PAGINATION.DEFAULT_LIMIT) => {
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE)
  const [limit] = useState(initialLimit)

  const result = useCallHistory({ limit, page })

  const nextPage = useCallback(() => {
    if (result.data?.pagination.hasNextPage) {
      setPage((p) => p + 1)
    }
  }, [result.data?.pagination.hasNextPage])

  const prevPage = useCallback(() => {
    if (result.data?.pagination.hasPrevPage) {
      setPage((p) => p - 1)
    }
  }, [result.data?.pagination.hasPrevPage])

  const goToPage = useCallback((newPage) => {
    setPage(newPage)
  }, [])

  return {
    ...result,
    page,
    setPage,
    limit,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: result.data?.pagination.hasNextPage || false,
    hasPrevPage: result.data?.pagination.hasPrevPage || false,
    totalPages: result.data?.pagination.totalPages || 1,
    totalCount: result.data?.pagination.totalCount || 0,
  }
}

export default useCallHistory

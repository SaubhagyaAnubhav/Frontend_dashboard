
import { useState, useCallback } from 'react'
import { callService } from '@/api'
import { useApi } from './useApi'
import { PAGINATION } from '@/utils/constants'

export const useCallHistory = (params = {}) => {
  const { limit = PAGINATION.DEFAULT_LIMIT, page = PAGINATION.DEFAULT_PAGE } = params


  const result = useApi(() => callService.getHistory({ limit, page }), {
    deps: [limit, page],
  })

  return result
}


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


import { get } from '../client'
import { callEndpoints } from '../endpoints'
import { PAGINATION } from '@/utils/constants'


const callService = {


  getStats: async () => {
    try {
      const data = await get(callEndpoints.stats())
      return data
    } catch (error) {
      console.error('Failed to fetch call stats:', error)
      throw error
    }
  },

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

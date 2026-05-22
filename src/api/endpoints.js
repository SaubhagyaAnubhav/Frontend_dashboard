

import { API_ENDPOINTS } from '@/utils/constants'


export const authEndpoints = {

  profile: () => API_ENDPOINTS.AUTH.PROFILE,


  dashboard: () => API_ENDPOINTS.AUTH.DASHBOARD,
}


export const callEndpoints = {

  stats: () => API_ENDPOINTS.CALL_SESSIONS.STATS,


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


  session: (sessionId) => `${API_ENDPOINTS.CALL_SESSIONS.HISTORY}/${sessionId}`,
}


export const healthEndpoint = {

  check: () => API_ENDPOINTS.HEALTH,
}


export const endpoints = {
  auth: authEndpoints,
  calls: callEndpoints,
  health: healthEndpoint,
}

export default endpoints



import { get } from '../client'
import { authEndpoints } from '../endpoints'


const authService = {
  getProfile: async () => {
    try {
      const data = await get(authEndpoints.profile())
      return data
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      throw error
    }
  },


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

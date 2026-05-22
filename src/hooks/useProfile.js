/**
 * useProfile Hook
 *
 * Fetches user profile data
 * Automatically refetches when user changes (u1 ↔ u2)
 *
 * @returns {Object} { data, loading, error, refetch }
 * @property {Object|null} data - User profile data
 * @property {string} data.id - User ID
 * @property {string} data.email - User email
 * @property {string} data.firstName - First name
 * @property {string} data.lastName - Last name
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error object if request failed
 * @property {Function} refetch - Manual refetch function
 *
 * @example
 * function ProfileCard() {
 *   const { data: profile, loading, error } = useProfile()
 *
 *   if (loading) return <Spinner />
 *   if (error) return <Error />
 *
 *   return (
 *     <div>
 *       <h2>{profile.firstName} {profile.lastName}</h2>
 *       <p>{profile.email}</p>
 *     </div>
 *   )
 * }
 */

import { authService } from '@/api'
import { useApi } from './useApi'

export const useProfile = () => {
  return useApi(() => authService.getProfile())
}

export default useProfile

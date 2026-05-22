/**
 * useDashboard Hook
 *
 * Fetches dashboard data (user + subscription + usage)
 * Automatically refetches when user changes (u1 ↔ u2)
 *
 * @returns {Object} { data, loading, error, refetch }
 * @property {Object|null} data - Dashboard data
 * @property {Object} data.user - User information
 * @property {Object|null} data.subscription - Subscription details
 * @property {Object} data.usage - Usage statistics
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error object if request failed
 * @property {Function} refetch - Manual refetch function
 *
 * @example
 * function Dashboard() {
 *   const { data, loading, error, refetch } = useDashboard()
 *
 *   if (loading) return <Spinner />
 *   if (error) return <Error message={error.message} />
 *
 *   return (
 *     <div>
 *       <h1>{data.user.firstName}</h1>
 *       <p>Plan: {data.subscription?.plan}</p>
 *       <p>Files: {data.usage.kb_files.used}/{data.usage.kb_files.limit}</p>
 *     </div>
 *   )
 * }
 */

import { authService } from '@/api'
import { useApi } from './useApi'

export const useDashboard = () => {
  return useApi(() => authService.getDashboard())
}

export default useDashboard

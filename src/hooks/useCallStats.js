/**
 * useCallStats Hook
 *
 * Fetches call session statistics
 * Automatically refetches when user changes (u1 ↔ u2)
 *
 * @returns {Object} { data, loading, error, refetch }
 * @property {Object|null} data - Call statistics
 * @property {number} data.totalSessions - Total number of sessions
 * @property {number} data.averageDuration - Average duration in seconds
 * @property {number} data.totalAIInteractions - Total AI interactions
 * @property {Array<string>} data.lastSession - Array of last session dates
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error object if request failed
 * @property {Function} refetch - Manual refetch function
 *
 * @example
 * function StatsCards() {
 *   const { data: stats, loading, error } = useCallStats()
 *
 *   if (loading) return <Spinner />
 *   if (error) return <Error />
 *
 *   return (
 *     <div>
 *       <StatCard label="Total Sessions" value={stats.totalSessions} />
 *       <StatCard label="Avg Duration" value={formatTime(stats.averageDuration)} />
 *       <StatCard label="AI Used" value={stats.totalAIInteractions} />
 *     </div>
 *   )
 * }
 */

import { callService } from '@/api'
import { useApi } from './useApi'

export const useCallStats = () => {
  return useApi(() => callService.getStats())
}

export default useCallStats

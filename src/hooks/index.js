/**
 * Hooks Barrel Export
 *
 * Centralized export for all custom hooks
 *
 * @example
 * import { useDashboard, useCallStats, useProfile } from '@/hooks'
 */

// Base hook
export { useApi } from './useApi'

// Data fetching hooks
export { useDashboard } from './useDashboard'
export { useProfile } from './useProfile'
export { useCallStats } from './useCallStats'
export { useCallHistory, useCallHistoryPaginated } from './useCallHistory'

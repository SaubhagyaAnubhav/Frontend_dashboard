/**
 * API Services Barrel Export
 *
 * Centralized export for all API services
 * Makes imports cleaner throughout the app
 *
 * @example
 * // Instead of:
 * import authService from '@/api/services/authService'
 * import callService from '@/api/services/callService'
 *
 * // You can do:
 * import { authService, callService } from '@/api/services'
 */

export { default as authService } from './authService'
export { default as callService } from './callService'

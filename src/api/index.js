/**
 * API Module Barrel Export
 *
 * Main entry point for all API-related imports
 *
 * @example
 * import { authService, callService, apiClient } from '@/api'
 */

// Export API client
export { default as apiClient, get, post, put, patch, del } from './client'

// Export endpoints
export { default as endpoints } from './endpoints'

// Export services
export * from './services'

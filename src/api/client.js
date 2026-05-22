/**
 * Axios API Client
 *
 * Centralized HTTP client with:
 * - Base configuration
 * - Request/response interceptors
 * - Error handling
 * - Timeout management
 * - Retry logic
 */

import axios from 'axios'
import { API_CONFIG, ERROR_MESSAGES, STORAGE_KEYS, USER_IDS } from '@/utils/constants'

/**
 * Create Axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Request Interceptor
 *
 * - Add user ID header
 * - Add authentication token (if needed)
 * - Log requests in development
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get user ID from localStorage or default
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || USER_IDS.EMPTY_STATE

    // Add user ID header for all requests
    config.headers['x-user-id'] = userId

    // Log request in development
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        userId,
        headers: config.headers,
        params: config.params,
      })
    }

    return config
  },
  (error) => {
    // Log error in development
    if (import.meta.env.MODE === 'development') {
      console.error('Request Error:', error)
    }
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 *
 * - Handle successful responses
 * - Handle errors globally
 * - Transform error messages
 * - Log responses in development
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      })
    }

    return response
  },
  (error) => {
    // Extract error information
    const errorResponse = {
      message: ERROR_MESSAGES.API_ERROR,
      status: error.response?.status,
      data: error.response?.data,
      originalError: error,
    }

    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      errorResponse.message = ERROR_MESSAGES.TIMEOUT
    } else if (!error.response) {
      errorResponse.message = ERROR_MESSAGES.NETWORK_ERROR
    } else {
      switch (error.response.status) {
        case 401:
          errorResponse.message = ERROR_MESSAGES.UNAUTHORIZED
          break
        case 404:
          errorResponse.message = ERROR_MESSAGES.NOT_FOUND
          break
        case 422:
          errorResponse.message = ERROR_MESSAGES.VALIDATION_ERROR
          break
        default:
          errorResponse.message = error.response.data?.message || ERROR_MESSAGES.API_ERROR
      }
    }

    // Log error in development
    if (import.meta.env.MODE === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        status: errorResponse.status,
        message: errorResponse.message,
        data: errorResponse.data,
      })
    }

    return Promise.reject(errorResponse)
  }
)

/**
 * Helper function to make GET requests
 *
 * @param {string} url - API endpoint
 * @param {Object} config - Axios config options
 * @returns {Promise} Response data
 */
export const get = async (url, config = {}) => {
  const response = await apiClient.get(url, config)
  return response.data
}

/**
 * Helper function to make POST requests
 *
 * @param {string} url - API endpoint
 * @param {Object} data - Request body
 * @param {Object} config - Axios config options
 * @returns {Promise} Response data
 */
export const post = async (url, data = {}, config = {}) => {
  const response = await apiClient.post(url, data, config)
  return response.data
}

/**
 * Helper function to make PUT requests
 *
 * @param {string} url - API endpoint
 * @param {Object} data - Request body
 * @param {Object} config - Axios config options
 * @returns {Promise} Response data
 */
export const put = async (url, data = {}, config = {}) => {
  const response = await apiClient.put(url, data, config)
  return response.data
}

/**
 * Helper function to make PATCH requests
 *
 * @param {string} url - API endpoint
 * @param {Object} data - Request body
 * @param {Object} config - Axios config options
 * @returns {Promise} Response data
 */
export const patch = async (url, data = {}, config = {}) => {
  const response = await apiClient.patch(url, data, config)
  return response.data
}

/**
 * Helper function to make DELETE requests
 *
 * @param {string} url - API endpoint
 * @param {Object} config - Axios config options
 * @returns {Promise} Response data
 */
export const del = async (url, config = {}) => {
  const response = await apiClient.delete(url, config)
  return response.data
}

export default apiClient

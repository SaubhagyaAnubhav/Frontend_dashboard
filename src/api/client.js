
import axios from 'axios'
import { API_CONFIG, ERROR_MESSAGES, STORAGE_KEYS, USER_IDS } from '@/utils/constants'


const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})


apiClient.interceptors.request.use(
  (config) => {

    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || USER_IDS.EMPTY_STATE


    config.headers['x-user-id'] = userId


    if (import.meta.env.MODE === 'development') {

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

    if (import.meta.env.MODE === 'development') {
      console.error('Request Error:', error)
    }
    return Promise.reject(error)
  }
)


apiClient.interceptors.response.use(
  (response) => {

    if (import.meta.env.MODE === 'development') {

      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      })
    }

    return response
  },
  (error) => {

    const errorResponse = {
      message: ERROR_MESSAGES.API_ERROR,
      status: error.response?.status,
      data: error.response?.data,
      originalError: error,
    }


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


export const get = async (url, config = {}) => {
  const response = await apiClient.get(url, config)
  return response.data
}


export const post = async (url, data = {}, config = {}) => {
  const response = await apiClient.post(url, data, config)
  return response.data
}


export const put = async (url, data = {}, config = {}) => {
  const response = await apiClient.put(url, data, config)
  return response.data
}


export const patch = async (url, data = {}, config = {}) => {
  const response = await apiClient.patch(url, data, config)
  return response.data
}


export const del = async (url, config = {}) => {
  const response = await apiClient.delete(url, config)
  return response.data
}

export default apiClient

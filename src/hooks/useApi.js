
import { useState, useEffect, useCallback, useRef } from 'react'
import { useUser } from '@/context/UserContext'

export const useApi = (apiFunction, options = {}) => {
  const { enabled = true, deps = [] } = options
  const { userId } = useUser()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)


  const apiFunctionRef = useRef(apiFunction)
  useEffect(() => {
    apiFunctionRef.current = apiFunction
  }, [apiFunction])


  const fetchData = useCallback(async () => {
    if (!enabled) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const result = await apiFunctionRef.current()
      setData(result)
    } catch (err) {
      setError(err)
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }, [enabled])


  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])


  useEffect(() => {

    fetchData()
  }, [fetchData, userId, ...deps]) 

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useApi

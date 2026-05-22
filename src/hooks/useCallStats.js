
import { callService } from '@/api'
import { useApi } from './useApi'

export const useCallStats = () => {
  return useApi(() => callService.getStats())
}

export default useCallStats

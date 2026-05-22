
import { authService } from '@/api'
import { useApi } from './useApi'

export const useDashboard = () => {
  return useApi(() => authService.getDashboard())
}

export default useDashboard

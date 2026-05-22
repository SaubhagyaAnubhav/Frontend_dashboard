
import { authService } from '@/api'
import { useApi } from './useApi'

export const useProfile = () => {
  return useApi(() => authService.getProfile())
}

export default useProfile

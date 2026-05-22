
import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { USER_IDS, STORAGE_KEYS } from '@/utils/constants'


const UserContext = createContext(undefined)


export const UserProvider = ({ children }) => {

  const [userId, setUserIdState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_ID)
    return stored || USER_IDS.EMPTY_STATE
  })


  const setUserId = useCallback((newUserId) => {
    setUserIdState(newUserId)
    localStorage.setItem(STORAGE_KEYS.USER_ID, newUserId)


    if (import.meta.env.MODE === 'development') {

      console.log('🔄 User switched:', newUserId)
    }
  }, [])


  const toggleUser = useCallback(() => {
    const newUserId = userId === USER_IDS.EMPTY_STATE ? USER_IDS.FILLED_STATE : USER_IDS.EMPTY_STATE
    setUserId(newUserId)
  }, [userId, setUserId])


  const isEmptyState = userId === USER_IDS.EMPTY_STATE

  const value = {
    userId,
    setUserId,
    toggleUser,
    isEmptyState,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default UserContext


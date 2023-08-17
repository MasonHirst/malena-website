import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'
import dayjs from 'dayjs'

export const StaffContext = createContext()

export function StaffContextFunction({ children }) {
  const { logout } = useContext(AuthContext)
  const [classList, setClassList] = useState([])
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(false)

  function getAllClasses() {
    setLoading(true)
    axios
      .get('/api/staff/classes/all')
      .then(({ data }) => {
        if (data.length) {
          const orderedClasses = data.sort((a, b) => {
            const aDate = dayjs(a.start_date)
            const bDate = dayjs(b.start_date)
            return aDate.isBefore(bDate) ? -1 : 1
          })
          setClassList(orderedClasses)
        }
      })
      .catch((err) => {
        if (err.response.request.status === 401) {
          console.error('unauthorized')
          logout()
        }
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  
  useEffect(() => {
    getAllClasses()
  }, [])

  return (
    <StaffContext.Provider
      value={{
        loading,
        setLoading,
        classList,
        setClassList,
        staffList,
        setStaffList,
        getAllClasses,
      }}
    >
      {children}
    </StaffContext.Provider>
  )
}

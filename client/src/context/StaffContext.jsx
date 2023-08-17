import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const StaffContext = createContext()

export function StaffContextFunction({ children }) {
  const [classList, setClassList] = useState([])
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/api/classes/all')
      .then(({ data }) => {
        console.log('classes: ', data)
        if (data.length) {
          setClassList(data)
        }
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
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
      }}
    >
      {children}
    </StaffContext.Provider>
  )
}

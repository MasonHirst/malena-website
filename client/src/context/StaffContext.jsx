import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const StaffContext = createContext()

export function StaffContextFunction({ children }) {
  const [classList, setClassList] = useState([])
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(false)

  function getAllClasses() {
    setLoading(true)
    axios
      .get('/api/staff/classes/all')
      .then(({ data }) => {
        if (data.length) {
          setClassList(data)
        }
      })
      .catch(console.error)
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

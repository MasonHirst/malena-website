import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { StaffContext } from '../../context/StaffContext'
import axios from 'axios'
import SignupCollapse from './SignupCollapse'

const Signups = () => {
  const { classList, loading, setLoading } = useContext(StaffContext)
  const [signups, setSignups] = useState([])
  const [classesWithSignups, setClassesWithSignups] = useState([])

  function getAllClassSignups() {
    setLoading(true)
    axios
      .get('/api/staff/get/signups')
      .then(({ data }) => {
        setSignups(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (classList.length) {
      getAllClassSignups()
    }
  }, [classList])

  useEffect(() => {
    // go through all the classes. place an array of signups inside the class object. push the new object into the signupsWithClass array.
    const classesAndSignups = classList.map((classObj) => {
      const signupsArr = []
      signups.forEach((signup) => {
        if (signup.class_id === classObj.id) {
          signupsArr.push(signup)
        }
      })
      classObj.signups = signupsArr
      return classObj
    })
    setClassesWithSignups(classesAndSignups)
  }, [signups])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography variant='h5' sx={{ margin: '1rem' }}>
        Class signups
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '1.5rem',
          overflowX: 'auto',
          padding: '10px',
        }}
      >
        {classesWithSignups.map((classObj, i) => {
          return <SignupCollapse key={i} classObj={classObj} />
        })}
      </Box>
    </Box>
  )
}

export default Signups

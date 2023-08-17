import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Dialog } from '@mui/material'
import axios from 'axios'
import NewClassForm from './NewClassForm'
import { StaffContext } from '../../context/StaffContext'

const Classes = () => {
  const { loading, setLoading, classList } = useContext(StaffContext)
  const [showNewClassForm, setShowNewClassForm] = useState(false)

  function handleSubmitNewClass(newClass) {
    setLoading(true)
    axios
    .post('/api/classes/create', { newClass })
    .then(({ data }) => {
      console.log('data: ', data)
      clearSessionStorageValues()
    })
    .catch(console.error)
    .finally(() => setLoading(false))
  }


  function clearSessionStorageValues() {
    sessionStorage.removeItem('classTitle')
    sessionStorage.removeItem('imgUrl')
    sessionStorage.removeItem('classType')
    sessionStorage.removeItem('shortDesc')
    sessionStorage.removeItem('fullDesc')
    sessionStorage.removeItem('otherInfo')
    sessionStorage.removeItem('locationStr')
    sessionStorage.removeItem('isMultiDay')
    sessionStorage.removeItem('startDate')
    sessionStorage.removeItem('endDate')
    sessionStorage.removeItem('startTime')
    sessionStorage.removeItem('endTime')
    sessionStorage.removeItem('pricePer')
    sessionStorage.removeItem('active')
    sessionStorage.removeItem('minAge')
    sessionStorage.removeItem('maxAge')
  }

  return (
    <Box>
      {!showNewClassForm && (
        <Button
          variant='contained'
          color='secondary'
          sx={{
            color: 'white',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
          onClick={() => setShowNewClassForm(!showNewClassForm)}
        >
          Create new class
        </Button>
      )}

      {showNewClassForm && (
        
          <NewClassForm
            showForm={showNewClassForm}
            setShowForm={setShowNewClassForm}
            handleFormSubmit={handleSubmitNewClass}
          />
      )}
    </Box>
  )
}

export default Classes

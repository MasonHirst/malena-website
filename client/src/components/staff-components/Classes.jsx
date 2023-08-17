import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, Dialog, Typography } from '@mui/material'
import axios from 'axios'
import NewClassForm from './NewClassForm'
import { StaffContext } from '../../context/StaffContext'
import ClassListCard from './ClassListCard'
import dayjs from 'dayjs'

const Classes = () => {
  const { loading, setLoading, classList, getAllClasses } =
    useContext(StaffContext)
  const [showNewClassForm, setShowNewClassForm] = useState(false)
  const [classToEdit, setClassToEdit] = useState(null)
  const [showEditClassForm, setShowEditClassForm] = useState(false)

  function handleSubmitEditClass(editedClass) {
    editedClass.id = classToEdit.id
    setLoading(true)
    axios
      .put('/api/staff/classes/update', { editedClass })
      .then(({ data }) => {
        if (data.id) {
          // clearSessionStorageValues()
          setShowEditClassForm(false)
          getAllClasses()
        } else console.error('error updating class')
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  function handleSubmitNewClass(newClass) {
    setLoading(true)
    axios
      .post('/api/staff/classes/create', { newClass })
      .then(({ data }) => {
        if (data.id) {
          clearSessionStorageValues()
          setShowNewClassForm(false)
          getAllClasses()
        } else console.error('error creating new class')
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  function handleEditClass(classObj) {
    setClassToEdit(classObj)
    setShowEditClassForm(true)
  }

  const orderedClasses = classList.sort((a, b) => {
    const aDate = dayjs(a.start_date)
    const bDate = dayjs(b.start_date)
    return aDate.isBefore(bDate) ? -1 : 1
  })

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
      <Button
        variant='contained'
        color='secondary'
        sx={{
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '18px',
          margin: '20px',
        }}
        onClick={() => setShowNewClassForm(!showNewClassForm)}
      >
        Create new class
      </Button>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '10px',
        }}
      >
        {orderedClasses.map((c, i) => {
          return (
            <ClassListCard
              key={i}
              classObj={c}
              handleEditSelect={handleEditClass}
            />
          )
        })}
      </Box>

      {showNewClassForm && (
        <NewClassForm
          showForm={showNewClassForm}
          setShowForm={setShowNewClassForm}
          handleFormSubmit={handleSubmitNewClass}
        />
      )}

      {showEditClassForm && (
        <NewClassForm
          saveFormSession={false}
          showForm={showEditClassForm}
          setShowForm={setShowEditClassForm}
          handleFormSubmit={handleSubmitEditClass}
          classData={classToEdit}
        />
      )}
    </Box>
  )
}

export default Classes

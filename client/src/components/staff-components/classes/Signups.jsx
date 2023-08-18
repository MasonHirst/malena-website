import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { StaffContext } from '../../../context/StaffContext'
import axios from 'axios'
import SignupCollapse from './SignupCollapse'
import { filterOrderClasses } from '../../../utilityFunctions'
import NewClassForm from '../../NewClassForm'
import AddIcon from '@mui/icons-material/Add'
import { toast } from 'react-toastify'

const Signups = () => {
  const { loading, setLoading, classList, getAllClasses } =
    useContext(StaffContext)
  const [signups, setSignups] = useState([])
  const [classesWithSignups, setClassesWithSignups] = useState([])
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
          toast.success(`${data.title} updated!`)
          setShowEditClassForm(false)
          getAllClasses()
        } else {
          toast.error('Error updating class')
          console.error('error updating class')
        }
      })
      .catch((err) => {
        console.error(err)
        toast.error('Error updating class')
      })
      .finally(() => setLoading(false))
  }

  function handleSubmitNewClass(newClass) {
    setLoading(true)
    axios
      .post('/api/staff/classes/create', { newClass })
      .then(({ data }) => {
        if (data.id) {
          toast.success(`${data.title} created!`)
          clearSessionStorageValues()
          setShowNewClassForm(false)
          getAllClasses()
        } else {
          toast.error('Error creating class')
          console.error('error creating new class')
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  function handleEditClass(classObj) {
    setClassToEdit(classObj)
    setShowEditClassForm(true)
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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingBottom: '5rem',
        }}
      >
        <Stack
          direction='row'
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            // border: '1px solid red',
            margin: '2rem',
            marginBottom: '1rem',
          }}
        >
          <Typography variant='h5'>Classes</Typography>
          <Button
            className='add-class-btn'
            variant='contained'
            color='secondary'
            endIcon={<AddIcon />}
            onClick={() => setShowNewClassForm(!showNewClassForm)}
          >
            Create new class
          </Button>
        </Stack>

        <Box className='class-card-cont'>
          {filterOrderClasses(classesWithSignups).map((classObj, i) => {
            return (
              <SignupCollapse
                key={i}
                classObj={classObj}
                getAllSignups={getAllClassSignups}
                handleEditSelect={handleEditClass}
              />
            )
          })}
        </Box>
        <Divider sx={{ margin: '20px' }}>
          <Typography
            sx={{
              fontSize: '1.2rem',
              opacity: 0.7,
            }}
          >
            Past classes
          </Typography>
        </Divider>
        <Box className='class-card-cont'>
          {filterOrderClasses(classesWithSignups, false).map((classObj, i) => {
            return (
              <SignupCollapse
                key={i}
                classObj={classObj}
                getAllSignups={getAllClassSignups}
                handleEditSelect={handleEditClass}
              />
            )
          })}
        </Box>
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
          editing
          saveFormSession={false}
          showForm={showEditClassForm}
          setShowForm={setShowEditClassForm}
          handleFormSubmit={handleSubmitEditClass}
          classData={classToEdit}
        />
      )}
    </>
  )
}

export default Signups

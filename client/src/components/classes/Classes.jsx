import React, { useState, useEffect } from 'react'
import axios from 'axios'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import ClassPreviewCard from './ClassPreviewCard'

const { Typography, Button, Box, Card, Skeleton } = muiStyles

const Classes = () => {
  const [classesLoading, setClassesLoading] = useState(false)
  const [classesError, setClassesError] = useState('')
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])

  useEffect(() => {
    setClassesLoading(true)
    axios
      .get('/api/classes')
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setClasses(data)
        } else {
          setClassesError(
            'There was a problem loading classes. Please try again in a few minutes.'
          )
        }
      })
      .catch(console.error)
      .finally(() => {
        setClassesLoading(false)
      })

    return () => {}
  }, [])

  function sortByStartDate(classes) {
    return classes.sort((a, b) => {
      const aDate = new Date(a.startDate)
      const bDate = new Date(b.startDate)
      return aDate - bDate
    })
  }

  const mappedClassCards =
    classes.length > 0 &&
    sortByStartDate(classes).map((classObj, index) => {
      document.title = 'Malena Hirst - Classes'

      return <ClassPreviewCard key={index} classObj={classObj} />
    })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
      }}
    >
      <Typography
        variant='h3'
        color='primary'
        sx={{
          fontWeight: 'bold',
          marginBottom: '40px',
          padding: '0 10px',
          textAlign: 'center',
        }}
      >
        Summer Classes 2023!
      </Typography>

      <Box
        id='class-cards-wrapper'
        sx={{
          display: 'flex',
          gap: '15px',
          // alignItems: 'flex-start',
          flexWrap: 'wrap',
          padding: '0 10px',
          width: '100%',
          justifyContent: 'center',
          rowGap: '30px',
        }}
      >
        {classesLoading ? (
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                width: 'min(90vw, 320px)',
                height: '450px',
                borderRadius: '6px',
              }}
            />
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                width: 'min(90vw, 320px)',
                height: '450px',
                borderRadius: '6px',
              }}
            />
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                width: 'min(90vw, 320px)',
                height: '450px',
                borderRadius: '6px',
              }}
            />
          </Box>
        ) : (
          mappedClassCards
        )}
      </Box>
      <Typography
        color={classesError && 'error'}
        sx={{
          opacity: 0.7,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '40px',
          fontSize: { xs: '18px', sm: '22px' },
        }}
      >
        {classesError
          ? classesError
          : 'More classes coming soon! Check back later for more info.'}
      </Typography>
    </Box>
  )
}

export default Classes

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import CampPreviewCard from './CampPreviewCard'

const { Typography, Button, Box, Card, Skeleton } = muiStyles

const SummerCamps = () => {
  const [campsLoading, setCampsLoading] = useState(false)
  const [campsError, setCampsError] = useState('')
  const navigate = useNavigate()
  const [summerCamps, setSummerCamps] = useState([])

  useEffect(() => {
    let loadingTimer
    let returnInfo
    // Set loading to true immediately
    setCampsLoading(true)
    // Start the timer
    const startTime = Date.now()
    axios
      .get('/api/camps')
      .then(({ data }) => {
        returnInfo = data
      })
      .catch(console.error)
      .finally(() => {
        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(600 - elapsedTime, 0)
        loadingTimer = setTimeout(() => {
          if (Array.isArray(returnInfo)) setSummerCamps(returnInfo)
          else setCampsError('There was a problem loading camps. Please try again in a few minutes.')
          setCampsLoading(false)
        }, remainingTime)
      })

    // Cleanup function to clear the timer if the component unmounts or the dependency array changes
    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  function sortByStartDate(camps) {
    return camps.sort((a, b) => {
      const aDate = new Date(a.startDate)
      const bDate = new Date(b.startDate)
      return aDate - bDate
    })
  }

  const mappedCampCards =
    summerCamps.length > 0 &&
    sortByStartDate(summerCamps).map((camp, index) => {
      document.title = 'Malena Hirst - Summer Camps'

      return <CampPreviewCard key={index} camp={camp} />
    })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        sx={{
          fontWeight: 'bold',
          marginBottom: '40px',
          padding: '0 10px',
          textAlign: 'center',
        }}
      >
        Summer Camps 2023!
      </Typography>

      <Box
        id="camp-cards-wrapper"
        sx={{
          display: 'flex',
          gap: '15px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          padding: '0 10px',
          width: '100%',
          justifyContent: 'center',
          rowGap: '30px',
        }}
      >
        {campsLoading ? (
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: 'min(90vw, 320px)',
                height: '450px',
                borderRadius: '6px',
              }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: 'min(90vw, 320px)',
                height: '450px',
                borderRadius: '6px',
              }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: 'min(90vw, 320px)',
                height: '450px',
                borderRadius: '6px',
              }}
            />
          </Box>
        ) : (
          mappedCampCards
        )}
      </Box>
      <Typography
        color={campsError && 'error'}
        sx={{
          opacity: 0.7,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '40px',
          fontSize: { xs: '18px', sm: '22px' },
        }}
      >
        {campsError
          ? campsError
          : 'More camps coming soon! Check back later for more info.'}
      </Typography>
    </Box>
  )
}

export default SummerCamps

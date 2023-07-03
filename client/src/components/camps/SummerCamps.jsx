import React, { useState, useEffect } from 'react'
import axios from 'axios'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'

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
      .catch((err) => {
        console.log(err)
        setCampsError(
          'There was a problem loading camps. Please try again in a few minutes.'
        )
      })
      .finally(() => {
        // Calculate the elapsed time
        const elapsedTime = Date.now() - startTime
        // Calculate the remaining time to wait (minimum 500ms)
        const remainingTime = Math.max(900 - elapsedTime, 0)
        // Set the loading state to false after the remaining time
        loadingTimer = setTimeout(() => {
          setSummerCamps(returnInfo)
          setCampsLoading(false)
        }, remainingTime)
      })

    // Cleanup function to clear the timer if the component unmounts or the dependency array changes
    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  const mappedCampCards =
    summerCamps.length > 0 &&
    summerCamps.map((camp, index) => {
      let ageRange
      if (camp.ageRange[1] === 100) {
        ageRange = camp.ageRange[0] + '+'
      } else {
        ageRange = camp.ageRange.join(' - ')
      }

      document.title = 'Malena Hirst - Summer Camps'

      return (
        <Card key={index} elevation={2} sx={{ maxWidth: 320 }}>
          <img
            className="cursor-pointer"
            src={camp.picUrl}
            style={{ width: '100%', maxWidth: '100%' }}
            alt={camp.title + 'image'}
            onClick={() => navigate(`${camp.href}`)}
          />
          <Box
            sx={{
              padding: '13px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: { xs: '24px', sm: '30px' },
              }}
            >
              {camp.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.8, textAlign: 'center', fontWeight: 'bold' }}
            >
              {camp.dates}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginTop: '5px',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.7,
                  textAlign: 'center',
                  fontSize: { xs: '16px', sm: '18px' },
                }}
              >
                {'Time: ' + camp.times}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.7,
                  textAlign: 'center',
                  fontSize: { xs: '16px', sm: '18px' },
                }}
              >
                {'Cost: $' + camp.perCost}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.7,
                  textAlign: 'center',
                  fontSize: { xs: '16px', sm: '18px' },
                }}
              >
                {'Ages: ' + ageRange}
              </Typography>
            </Box>
            <Typography
              variant="subtitle"
              sx={{ fontSize: { xs: '16px', sm: '18px' } }}
            >
              {camp.shortDescription}
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(`/camps/${camp.href}`)}
              sx={{
                textTransform: 'none',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                width: '100%',
                marginTop: '10px',
              }}
            >
              Sign up
            </Button>
          </Box>
        </Card>
      )
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
          <Box sx={{ display: 'flex', gap: '15px' }}>
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

        {campsError && (
          <Typography
            sx={{
              opacity: 0.7,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: '40px',
              fontSize: { xs: '18px', sm: '22px' },
            }}
          >
            {campsError}
          </Typography>
        )}
      </Box>
      <Typography
        sx={{
          opacity: 0.7,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '40px',
          fontSize: { xs: '18px', sm: '22px' },
        }}
      >
        More camps coming soon! Check back later for more info.
      </Typography>
    </Box>
  )
}

export default SummerCamps

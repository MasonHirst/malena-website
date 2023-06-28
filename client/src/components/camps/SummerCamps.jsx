import React, { useState, useEffect } from 'react'
import axios from 'axios'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
// import { summerCamps } from '../../assetts/data'

const { Typography, Button, Box, Card } = muiStyles

const SummerCamps = () => {
  const navigate = useNavigate()
  const [summerCamps, setSummerCamps] = useState([])

  useEffect(() => {
    axios.get('/api/camps').then(({data}) => {
      if (Array.isArray(data)) {
        setSummerCamps(data)
      }
    }).catch(console.error)
  }, [])
  
  const mappedCampCards = summerCamps.length > 0 && summerCamps.map((camp, index) => {
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
          src={camp.picUrl}
          style={{ width: '100%', maxWidth: '100%' }}
          alt={camp.title + 'image'}
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
        sx={{ fontWeight: 'bold', marginBottom: '40px' }}
      >
        Summer Camps 2023!
      </Typography>

      <Box
        id="camp-cards-wrapper"
        sx={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}
      >
        {mappedCampCards}
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

import React from 'react'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'

const { Typography, Button, Box, Card, Skeleton } = muiStyles

const CampPreviewCard = ({ camp }) => {
  const navigate = useNavigate()

  let dateRange
  if (camp.startDate === camp.endDate) {
    dateRange = camp.startDate
  } else {
    dateRange = camp.startDate + ' - ' + camp.endDate
  }

  let ageRange
  if (camp.ageRange[1] === 100) {
    ageRange = camp.ageRange[0] + '+'
  } else {
    ageRange = camp.ageRange.join(' - ')
  }

  return (
    <Card elevation={2} sx={{ maxWidth: 320 }}>
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
          {dateRange}
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
}

export default CampPreviewCard

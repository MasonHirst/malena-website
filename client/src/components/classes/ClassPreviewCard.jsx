import React from 'react'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import {
  getAgeRange,
  getClassTimeRange,
  getDateRange,
} from '../../utilityFunctions'

const { Typography, Button, Box, Card } = muiStyles

const ClassPreviewCard = ({ classObj }) => {
  const navigate = useNavigate()
  const {
    min_age,
    max_age,
    start_date,
    end_date,
    id,
    href,
    start_time,
    end_time,
    title,
    pic_url,
    short_desc,
    per_cost,
  } = classObj

  return (
    <Card
      elevation={2}
      sx={{
        width: 'min(100%, 320px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        className='class-card-img-cont'
        sx={{
          backgroundImage: `url(${pic_url})`,
        }}
        onClick={() => navigate(`${href}?id=${id}`)}
      />
      <Box
        sx={{
          flex: 1,
          padding: '13px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant='h5'
            color='primary'
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '24px', sm: '30px' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant='h6'
            sx={{ opacity: 0.8, textAlign: 'center', fontWeight: 'bold' }}
          >
            {getDateRange(start_date, end_date)}
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
              variant='subtitle1'
              sx={{
                opacity: 0.7,
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '18px' },
              }}
            >
              {'Time: ' + getClassTimeRange(start_time, end_time)}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                opacity: 0.7,
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '18px' },
              }}
            >
              {'Cost: $' + per_cost}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                opacity: 0.7,
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '18px' },
              }}
            >
              {'Ages: ' + getAgeRange(min_age, max_age)}
            </Typography>
          </Box>
          <Typography
            variant='subtitle'
            sx={{ fontSize: { xs: '16px', sm: '18px' } }}
          >
            {short_desc}
          </Typography>
        </Box>
        <Button
          variant='contained'
          size='small'
          onClick={() => navigate(`${href}?id=${id}`)}
          sx={{
            alignSelf: 'flex-end',
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

export default ClassPreviewCard

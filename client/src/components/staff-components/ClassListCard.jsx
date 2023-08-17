import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import { getAgeRange, getClassTimeRange, getDateRange } from '../../utilityFunctions'

const ClassListCard = ({ classObj, handleEditSelect }) => {
  const {
    end_date,
    start_date,
    start_time,
    end_time,
    min_age,
    max_age,
    pic_url,
    title,
    per_cost,
    short_desc,
  } = classObj

  return (
    <Card
      elevation={2}
      sx={{
        width: 'min(100%, 300px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        className='class-card-img-cont'
        sx={{
          backgroundImage: `url(${pic_url})`,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
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
          onClick={() => handleEditSelect(classObj)}
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
          Edit class
        </Button>
      </Box>
    </Card>
  )
}

export default ClassListCard

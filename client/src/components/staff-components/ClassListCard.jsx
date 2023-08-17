import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'

const ClassListCard = ({ classObj, handleEditSelect }) => {
  const {
    end_date,
    start_date,
    start_time,
    end_time,
    min_age,
    max_age,
    id,
    pic_url,
    href,
    title,
    per_cost,
    short_desc,
  } = classObj

  let dateRange
  if (start_date === end_date) {
    dateRange = formatClassDate(start_date)
  } else {
    dateRange = formatClassDate(start_date) + ' - ' + formatClassDate(end_date)
  }

  let ageRange
  if (min_age === max_age) {
    ageRange = min_age
  } else if (min_age === 0 && max_age < 100) {
    ageRange = max_age + ' and under'
  } else if (min_age > 0 && max_age === 100) {
    ageRange = min_age + ' and up'
  } else if (min_age > 0 && max_age < 100) {
    ageRange = min_age + ' - ' + max_age
  } else if (min_age === 0 && max_age === 100) {
    ageRange = 'All ages'
  }

  function formatClassDate(date) {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString('default', { month: 'short' })
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`
  }

  function formatClassTimes(dateString) {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}${ampm}`
  }

  return (
    <Card
      elevation={2}
      sx={{ maxWidth: 320, display: 'flex', flexDirection: 'column' }}
    >
      <Box
        className='class-card-img-cont'
        sx={{
          backgroundImage: `url(${pic_url})`,
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
              variant='subtitle1'
              sx={{
                opacity: 0.7,
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '18px' },
              }}
            >
              {'Time: ' +
                formatClassTimes(start_time) +
                ' - ' +
                formatClassTimes(end_time)}
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
              {'Ages: ' + ageRange}
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

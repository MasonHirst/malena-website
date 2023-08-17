import React from 'react'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'

const { Typography, Button, Box, Card, Skeleton } = muiStyles

const ClassPreviewCard = ({ classObj }) => {
  const navigate = useNavigate()

  let dateRange
  if (classObj.start_date === classObj.end_date) {
    dateRange = formatClassDate(classObj.start_date)
  } else {
    dateRange =
      formatClassDate(classObj.start_date) +
      ' - ' +
      formatClassDate(classObj.end_date)
  }

  let ageRange
  const {min_age, max_age} = classObj
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
    <Card elevation={2} sx={{ maxWidth: 320, display: 'flex', flexDirection: 'column', }}>
      <Box
        className='class-card-img-cont'
        sx={{
          backgroundImage: `url(${classObj.pic_url})`,
        }}
        onClick={() => navigate(`${classObj.href}?id=${classObj.id}`)}
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
            {classObj.title}
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
              {'Time: ' + formatClassTimes(classObj.start_time) + ' - ' + formatClassTimes(classObj.end_time)}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                opacity: 0.7,
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '18px' },
              }}
            >
              {'Cost: $' + classObj.per_cost}
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
            {classObj.short_desc}
          </Typography>
        </Box>
        <Button
          variant='contained'
          size='small'
          onClick={() => navigate(`${classObj.href}?id=${classObj.id}`)}
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

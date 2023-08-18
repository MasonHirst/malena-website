import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import muiStyles from '../../styles/muiStyles'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { validate } from 'email-validator'
import ClassConfirmDialog from './ClassConfirmDialog'
import axios from 'axios'
import dayjs from 'dayjs'
import {
  classNotOver,
  getAgeRange,
  getClassTimeRange,
  getDateRange,
} from '../../utilityFunctions'
import ClassSignupForm from './ClassSignupForm'

const {
  Box,
  Typography,
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  AddIcon,
  IconButton,
  DeleteOutlineIcon,
  Card,
  InfoOutlinedIcon,
  LightTooltip,
  CircularProgress,
  ChevronLeftIcon,
} = muiStyles

const ClassPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const class_id_param = searchParams.get('id')

  // const [signerName, setSignerName] = useState('')
  // const [signerEmail, setSignerEmail] = useState('')
  // const [signerPhone, setSignerPhone] = useState('')
  // const [commentsInput, setCommentsInput] = useState('')
  // const [formError, setFormError] = useState('')
  // const [showConfirmInfoDialog, setShowConfirmInfoDialog] = useState(false)
  // const [participants, setParticipants] = useState([{ name: '', age: '' }])
  const [classObj, setClassObj] = useState({})
  const {
    min_age,
    max_age,
    start_date,
    end_date,
    title,
    pic_url,
    per_cost,
    other_info,
    start_time,
    end_time,
    full_desc,
    location: locationStr,
  } = classObj

  useEffect(() => {
    document.title = `Malena Hirst - ${title}`
    axios
      .get(`/api/get/classes/${class_id_param}`)
      .then(({ data }) => {
        if (data.id) {
          setClassObj(data)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Class not found!',
            confirmButtonText: 'Go back',
            confirmButtonColor: '#f50057',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/classes')
            }
          })
        }
      })
      .catch(console.error)
  }, [location])

  const instructor = {
    name: 'Malena Hirst',
  }

  if (!title) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress size={70} />
      </Box>
    )
  }

  return (
    <Box
      className='flex-col'
      sx={{
        gap: '15px',
        alignItems: 'center',
        padding: '0 12px',
        marginBottom: '100px',
        marginTop: '10px',
      }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <IconButton onClick={() => navigate('../classes')}>
          <ChevronLeftIcon sx={{ fontSize: '40px' }} />
        </IconButton>
      </Box>

      <Typography
        variant='h5'
        color='primary'
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '26px', sm: '36px' },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='h6'
        sx={{
          opacity: 0.7,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '17px', sm: '20px' },
          marginTop: '-10px',
        }}
      >
        Instructor: {instructor.name}
      </Typography>

      <Box
        className='class-main-background-img'
        sx={{
          backgroundImage: `url(${pic_url})`,
        }}
      />

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
        <Typography
          variant='subtitle1'
          sx={{
            opacity: 0.7,
            textAlign: 'center',
            fontSize: { xs: '16px', sm: '18px' },
          }}
        >
          {'Location: ' + locationStr}
        </Typography>
      </Box>
      <Typography
        variant='subtitle'
        sx={{
          fontSize: { xs: '16px', sm: '18px' },
          marginTop: '10px',
          maxWidth: '700px',
        }}
      >
        {full_desc}
      </Typography>

      <Typography
        variant='subtitle'
        sx={{
          fontSize: { xs: '16px', sm: '18px' },
          display: other_info ? 'block' : 'none',
          maxWidth: '700px',
        }}
      >
        <span>Other info: </span>
        {other_info}
      </Typography>

      {classNotOver(end_date) ? (
        <ClassSignupForm classObj={classObj} />
      ) : (
        <Typography
          variant='h6'
          sx={{
            fontStyle: 'italic',
            fontSize: { xs: '18px', sm: '22px' },
            opacity: 0.7,
            marginTop: '20px',
          }}
        >
          This class has ended
        </Typography>
      )}
    </Box>
  )
}

export default ClassPage

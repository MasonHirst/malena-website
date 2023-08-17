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
import { getAgeRange, getClassTimeRange, getDateRange } from '../../utilityFunctions'

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
  const is350Screen = useMediaQuery('(max-width: 350px)')
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const is700Screen = useMediaQuery('(max-width: 700px)')
  const [signerName, setSignerName] = useState('')
  const [signerEmail, setSignerEmail] = useState('')
  const [signerPhone, setSignerPhone] = useState('')
  const [commentsInput, setCommentsInput] = useState('')
  const [formError, setFormError] = useState('')
  const [showConfirmInfoDialog, setShowConfirmInfoDialog] = useState(false)
  const [participants, setParticipants] = useState([{ name: '', age: '' }])
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
    need_guardian_signup,
    start_time,
    end_time,
    full_desc,
    location: locationStr
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

  const ageOptions = []
  if (title) {
    for (let i = min_age; i <= max_age; i++) {
      ageOptions.push(+i)
    }
  }

  function handleRemoveParticipant(index) {
    const updatedParticipants = [...participants]
    updatedParticipants.splice(index, 1)
    setParticipants(updatedParticipants)
  }

  function handleAgeChange(age, index) {
    const updatedParticipants = [...participants]
    updatedParticipants[index].age = age
    setParticipants(updatedParticipants)
  }

  function handleNameChange(name, index) {
    const updatedParticipants = [...participants]
    updatedParticipants[index].name = name
    setParticipants(updatedParticipants)
  }

  function handleConfirmForm() {
    setFormError('')
    if (!signerName || !signerEmail || !signerPhone) {
      return setFormError('Please fill out all contact fields')
    }
    if (!validate(signerEmail))
      return setFormError('Please enter a valid email')
    if (participants.filter((val) => val.name).length < 1) {
      return setFormError('Please add at least one participant')
    }

    // if need_guardian_signup is true, make sure all participants have a name and age. otherwise, just make sure every participant has a name
    if (
      need_guardian_signup &&
      participants.filter((val) => val.name && val.age).length !==
        participants.length
    ) {
      return setFormError('All participant fields must be filled.')
    } else if (
      !need_guardian_signup &&
      participants.filter((val) => val.name).length !== participants.length
    ) {
      return setFormError('All participant fields must be filled.')
    }

    setShowConfirmInfoDialog(true)
  }

  function handleSubmitForm() {
    const formInfo = {
      signerName,
      signerEmail,
      signerPhone,
      participants,
      comments: commentsInput,
      classObj,
    }
    axios
      .post('/api/class-signup', formInfo)
      .then(({ data }) => {
        if (!data) return alert('Something went wrong. Please try again.')
        Swal.fire({
          icon: 'success',
          title: 'Form submitted!',
          text: 'We will send you an email with more details.',
          confirmButtonText: 'Yay!',
          confirmButtonColor: '#f50057',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/classes')
          }
        })
      })
      .catch(console.error)
  }

  function classNotOver() {
    const { end_date } = classObj
    const currentDate = dayjs().startOf('day')
    const endDate = dayjs(end_date).startOf('day')

    return endDate.isSame(currentDate) || endDate.isAfter(currentDate)
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
      <img
        src={pic_url}
        alt={title}
        style={{
          width: 'min(100%, 600px)',
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
          {'Time: ' +
            getClassTimeRange(start_time, end_time)}
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

      {/* start of the signup form */}
      {classNotOver() ? (
        <Card
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: isSmallScreen ? '10px' : '20px',
            width: 'min(100%, 850px)',
            gap: '10px',
            borderRadius: '10px',
            marginTop: '20px',
          }}
        >
          <Typography
            variant='h6'
            color='primary'
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '26px', sm: '36px' },
            }}
          >
            Sign up for {title}
          </Typography>

          <Typography sx={{ marginTop: '-15px', textAlign: 'center' }}>
            More details (including exact address) will be sent to participants.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '-5px',
              marginTop: '10px',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontSize: { xs: '18px', sm: '22px' },
                opacity: 0.7,
              }}
            >
              {need_guardian_signup
                ? 'Parent/guardian contact info'
                : 'Your contact info'}
            </Typography>
            <LightTooltip
              title={
                <Typography sx={{ fontSize: '14px' }}>
                  Fill out information for the person we should contact about
                  payment and other details.
                </Typography>
              }
            >
              <InfoOutlinedIcon sx={{ marginLeft: '5px' }} />
            </LightTooltip>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: is700Screen ? 'column' : 'row',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <TextField
              size='small'
              label='Full name'
              sx={{ width: '100%', maxWidth: is700Screen ? '100%' : '300px' }}
              value={signerName}
              onChange={(e) => setSignerName(e.currentTarget.value)}
            />
            <TextField
              size='small'
              label='Email'
              type='email'
              sx={{ width: '100%', maxWidth: is700Screen ? '100%' : '300px' }}
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.currentTarget.value)}
            />
            <TextField
              size='small'
              label='Phone number'
              type='number'
              sx={{ width: '100%', maxWidth: is700Screen ? '100%' : '300px' }}
              value={signerPhone}
              onChange={(e) => setSignerPhone(e.currentTarget.value)}
            />
          </Box>

          <Typography
            variant='h6'
            sx={{
              fontSize: { xs: '18px', sm: '22px' },
              opacity: 0.7,
              marginBottom: '-5px',
              marginTop: '20px',
            }}
          >
            Participant info
          </Typography>

          <Box className='flex-col' sx={{ gap: is350Screen ? '30px' : '10px' }}>
            {participants.map((participant, index) => {
              return (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: is350Screen ? 'column' : 'row',
                        gap: '10px',
                      }}
                    >
                      <TextField
                        size='small'
                        label='Name'
                        value={participant.name}
                        onChange={(e) =>
                          handleNameChange(e.currentTarget.value, index)
                        }
                      />
                      {need_guardian_signup && (
                        <FormControl>
                          <InputLabel size='small'>Age</InputLabel>
                          <Select
                            sx={{ width: is350Screen ? '100%' : '90px' }}
                            size='small'
                            value={participant.age}
                            onChange={(e) =>
                              handleAgeChange(e.target.value, index)
                            }
                            label='Age'
                          >
                            {ageOptions.map((age, index) => (
                              <MenuItem key={index} value={age}>
                                {age}
                              </MenuItem>
                            ))}
                            <MenuItem value='other'>Other</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                    <IconButton onClick={() => handleRemoveParticipant(index)}>
                      <DeleteOutlineIcon color='error' />
                    </IconButton>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Button
            variant='text'
            color='secondary'
            sx={{
              textTransform: 'none',
              fontSize: { xs: '16px', sm: '18px' },
              fontWeight: 'bold',
            }}
            onClick={() =>
              setParticipants([...participants, { name: '', age: '' }])
            }
            startIcon={<AddIcon />}
          >
            participant
          </Button>

          <Typography
            variant='subtitle'
            color='error'
            sx={{
              fontSize: { xs: '16px', sm: '18px' },
              marginTop: '10px',
              textAlign: 'center',
              maxWidth: '675px',
              opacity: 0.7,
            }}
          >
            {participants.filter((participant) => participant.age === 'other')
              .length > 0 &&
              `You marked a participant's age as other. Please provide details about this partipant, as their participation is subject to the instructor's discretion.`}
          </Typography>

          <TextField
            size='small'
            label='Anything else we should know?'
            multiline
            minRows={3}
            sx={{ width: 'min(100%, 550px)' }}
            maxRows={8}
            inputProps={{ maxLength: 900 }}
            value={commentsInput}
            onChange={(e) => setCommentsInput(e.target.value)}
          />

          <Typography
            variant='subtitle'
            color='error'
            sx={{
              fontSize: { xs: '16px', sm: '18px' },
              marginTop: '10px',
              fontWeight: 'bold',
            }}
          >
            {formError}
          </Typography>

          <Button
            variant='contained'
            color='secondary'
            onClick={handleConfirmForm}
            sx={{
              textTransform: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              width: 'min(100%, 250px)',
              marginTop: '10px',
            }}
          >
            Next
          </Button>
        </Card>
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

      <ClassConfirmDialog
        showDialog={showConfirmInfoDialog}
        setShowDialog={setShowConfirmInfoDialog}
        handleSubmitForm={handleSubmitForm}
        formInfo={{
          signerName,
          signerEmail,
          signerPhone,
          participants,
          commentsInput,
          classObj,
        }}
      />
    </Box>
  )
}

export default ClassPage

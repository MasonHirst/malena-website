import React, { useState } from 'react'
import muiStyles from '../../styles/muiStyles'
import { useMediaQuery } from '@mui/material'
import { validate } from 'email-validator'
import { getAgeRangeOptions } from '../../utilityFunctions'
import ClassConfirmDialog from './ClassConfirmDialog'
import axios from 'axios'
import PaymentDialog from './PaymentDialog'
import { toast } from 'react-toastify'
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
} = muiStyles

const ClassSignupForm = ({ classObj }) => {
  const { min_age, max_age, title, need_guardian_signup } = classObj
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
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

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
        if (!data) {
          return alert(
            'Something went wrong. Please try again, or contact Malena at (385)321-0150 directly.'
          )
        }
        toast.success('Sign up successful!')
        setShowPaymentDialog(true)
      })
      .catch((err) => {
        alert(
          'Something went wrong. Please try again, or contact Malena at (385)321-0150 directly.'
        )
        console.error(err)
      })
      .finally(() => setShowConfirmInfoDialog(false))
  }

  return (
    <>
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
            required
            size='small'
            label='Full name'
            sx={{ width: '100%', maxWidth: is700Screen ? '100%' : '300px' }}
            value={signerName}
            onChange={(e) => setSignerName(e.currentTarget.value)}
          />
          <TextField
            required
            size='small'
            label='Email'
            type='email'
            sx={{ width: '100%', maxWidth: is700Screen ? '100%' : '300px' }}
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.currentTarget.value)}
          />
          <TextField
            required
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
        <Typography sx={{ marginTop: '-5px' }}>
          (Include yourself if you plan to participate)
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
                      required
                      size='small'
                      label='Name'
                      value={participant.name}
                      onChange={(e) =>
                        handleNameChange(e.currentTarget.value, index)
                      }
                    />
                    {need_guardian_signup && (
                      <FormControl required>
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
                          {getAgeRangeOptions(min_age, max_age).map(
                            (age, index) => (
                              <MenuItem key={index} value={age}>
                                {age}
                              </MenuItem>
                            )
                          )}
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

      <PaymentDialog
        showDialog={showPaymentDialog}
        setShowDialog={setShowPaymentDialog}
        formInfo={{
          signerName,
          signerEmail,
          signerPhone,
          participants,
          commentsInput,
          classObj,
        }}
      />
    </>
  )
}

export default ClassSignupForm

import React from 'react'
import muiStyles from '../../styles/muiStyles'
import { useMediaQuery } from '@mui/material'

const { Dialog, Typography, Button, Box, DialogActions } = muiStyles

const ClassConfirmDialog = ({ showDialog, setShowDialog, formInfo, handleSubmitForm }) => {
  const {
    classObj,
    signerName,
    signerEmail,
    signerPhone,
    participants,
    commentsInput,
  } = formInfo
  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  return (
    <Dialog
      open={showDialog}
      PaperProps={{
        style: {
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: isSmallScreen ? '100vw' : 'min(550px, calc(100vw - 16px))',
          padding: isSmallScreen ? '50px 10px' : '40px 50px',
        },
      }}
    >
      <Typography
        color="primary"
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '24px', sm: '28px' },
          marginBottom: '20px',
        }}
      >
        Does this look right?
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '18px', sm: '22px' },
          opacity: 0.8,
          fontWeight: 'bold',
        }}
      >
        {classObj.need_guardian_signup
          ? 'Parent/guardian contact info'
          : 'Your contact info'}
      </Typography>
      <Box sx={{ marginLeft: '20px' }}>
        <Typography>Name: {signerName}</Typography>
        <Typography>Phone: {signerPhone}</Typography>
        <Typography>Email: {signerEmail}</Typography>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '18px', sm: '22px' },
          opacity: 0.8,
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      >
        Participants
      </Typography>
      <Box sx={{ marginLeft: '20px' }}>
        {participants.map((participant, index) => {
          const { name, age } = participant
          return (
            <Typography key={index}>
              {name} {age && `(${age})`}
            </Typography>
          )
        })}
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '18px', sm: '22px' },
          opacity: 0.8,
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      >
        Comments
      </Typography>
      <Typography sx={{ marginLeft: '20px' }}>{commentsInput}</Typography>

      <DialogActions
        sx={{
          width: '100%',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '20px',
        }}
      >
        <Button
          variant="text"
          color="secondary"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
          onClick={() => setShowDialog(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: 'white',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
          onClick={handleSubmitForm}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClassConfirmDialog

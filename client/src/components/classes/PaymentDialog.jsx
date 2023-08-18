import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from '@mui/material'
import malenaVenmo from '../../assetts/malena-venmo.jpg'
import { blue } from '@mui/material/colors'

const PaymentDialog = ({ showDialog, setShowDialog, formInfo }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const [showOtherPaymentMessage, setShowOtherPaymentMessage] = useState(false)

  return (
    <>
      <Dialog
        open={showDialog}
        fullScreen={isSmallScreen}
        PaperProps={{
          style: {
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            height: isSmallScreen ? '100vh' : 'fit-content',
            maxHeight: isSmallScreen ? '100vh' : 'calc(100vh - 30px)',
            minWidth: isSmallScreen
              ? '100vw'
              : 'min(550px, calc(100vw - 16px))',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Thanks,{' '}
          <span style={{ fontWeight: 'bolder', color: blue[500] }}>
            {formInfo.signerName}
          </span>
          !
        </DialogTitle>

        <Box
          sx={{
            padding: '0 20px',
          }}
        >
          <DialogContentText>
            We've sent you an email with your signup details.
          </DialogContentText>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '25px',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                opacity: 0.8,
                maxWidth: '350px',
                lineHeight: '1.3',
                marginBottom: '10px',
              }}
            >
              Please send payment to Malena's Venmo before continuing:
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              @Malena-Hirst
            </Typography>
          </Box>
        </Box>
        <img
          src={malenaVenmo}
          alt="Malena's venmo"
          style={{
            width: '100%',
          }}
        />

        <DialogActions
          className='dialog-actions-wrapper'
          sx={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            color='info'
            variant='contained'
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            onClick={() => {
              setShowDialog(false)
              setShowOtherPaymentMessage(true)
            }}
          >
            I'll pay another way
          </Button>
          <Button
            color='primary'
            variant='contained'
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            onClick={() => setShowDialog(false)}
          >
            I've sent payment!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showOtherPaymentMessage}
        PaperProps={{
          style: {
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            minWidth: isSmallScreen
              ? '100vw'
              : 'min(550px, calc(100vw - 16px))',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
          }}
        >
          Thanks for signing up!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Planning the class is much easier when we know who's coming. Please
            send payment to Malena as soon as possible to confirm your spot.
          </DialogContentText>
          <DialogContentText
            sx={{
              marginBottom: '20px',
            }}
          >
            For other ways to pay, please contact Malena directly.
          </DialogContentText>

          <Box>
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Malena Hirst
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              <span style={{ opacity: 0.7 }}>Venmo: </span>@Malena-Hirst
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              <span style={{ opacity: 0.7 }}>Phone: </span>(385) 321-0150
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              <span style={{ opacity: 0.7 }}>Email: </span>
              malena.hirst@gmail.com
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <Button
            color='info'
            variant='contained'
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            onClick={() => {
              setShowDialog(true)
              setShowOtherPaymentMessage(false)
            }}
          >
            Pay with venmo
          </Button>
          <Button
            color='primary'
            variant='contained'
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            onClick={() => setShowOtherPaymentMessage(false)}
          >
            I understand
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PaymentDialog

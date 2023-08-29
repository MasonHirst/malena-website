import React from 'react'
import { Box, Stack } from '@mui/material'
import Footer from '../Footer'

const ContactMePage = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          margin: '120px 0',
        }}
      >
        <Stack
          sx={{
            margin: '0 auto',
            width: 'fit-content',
          }}
        >
          <h1>Contact Me</h1>
          <p>
            Email:
            <a
              href='mailto: malena.hirst@gmail.com'
              style={{ marginLeft: '5px' }}
            >
              malena.hirst@gmail.com
            </a>
          </p>
          <p>
            Phone:
            <a href='tel: 3853210150' style={{ marginLeft: '5px' }}>
              (385)321-0150
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </>
  )
}

export default ContactMePage

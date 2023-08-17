import React, { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  getClassTimeRange,
  getDateRange,
  getParticipantCount,
} from '../../utilityFunctions'
import { green, red } from '@mui/material/colors'
import { StaffContext } from '../../context/StaffContext'

const SignupCollapse = ({ classObj }) => {
  const {
    title,
    start_date,
    end_date,
    pic_url,
    short_desc,
    signups,
    start_time,
    end_time,
  } = classObj
  const [isExpanded, setIsExpanded] = useState(false)
  const [textCopied, setTextCopied] = useState(false)
  const { loading, setLoading } = useContext(StaffContext)

  function handleCopyAllEmails() {
    if (textCopied) return
    const emails = signups.map((signup) => signup.signer_email).join(', ')
    navigator.clipboard.writeText(emails)
    setTextCopied(true)
    setTimeout(() => setTextCopied(false), 1500)
  }

  function handleUpdatePaidStatus(paid, signupId) {
    // setLoading(true)
    axios
      .put('/api/staff/signup/update/paid', {
        paid,
        signupId
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  return (
    <Card
      elevation={4}
      sx={{
        minWidth: '900px',
        maxWidth: '1200px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '1rem',
        }}
      >
        <Box
          sx={{
            width: '220px',
            minWidth: '220px',
            height: '170px',
            backgroundColor: 'rgba(0,0,0,.3)',
            backgroundImage: `url(${pic_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            maxWidth: 'calc(100% - 220px)',
          }}
        >
          <Box
            sx={{
              padding: '.5rem',
              maxWidth: 'calc(100% - 50px)',
              flex: 1,
            }}
          >
            <Typography
              className='no-wrap-ellipsis'
              variant='h3'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>
            <Typography className='no-wrap-ellipsis'>
              When: {getDateRange(start_date, end_date)}
            </Typography>
            <Typography className='no-wrap-ellipsis'>
              Time: {getClassTimeRange(start_time, end_time)}
            </Typography>
            <Typography className='no-wrap-ellipsis'>
              Short desc: {short_desc}
            </Typography>
            <Typography className='no-wrap-ellipsis'>
              Signups:{' '}
              <span style={{ fontWeight: 'bold' }}>{signups.length}</span>
            </Typography>
            <Typography className='no-wrap-ellipsis'>
              Participants:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {getParticipantCount(signups)}
              </span>
            </Typography>
          </Box>

          {isExpanded ? (
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              <ExpandLessIcon fontSize='large' />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              <ExpandMoreIcon fontSize='large' />
            </IconButton>
          )}
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            margin: '1rem',
            marginBottom: '.5rem',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              color: 'white',
            }}
            onClick={handleCopyAllEmails}
          >
            {textCopied ? 'Copied!' : 'Copy emails to clipboard'}
            {!textCopied && <ContentCopyIcon sx={{ marginLeft: '7px' }} />}
          </Button>
        </Box>

        <Divider
          sx={{
            marginBottom: signups.length ? '0' : '1rem',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.2rem',
              opacity: 0.8,
              fontWeight: 'bold',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {signups.length ? 'Signups' : 'No signups yet'}
          </Typography>
        </Divider>

        {signups.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='table-header-text'>Paid</TableCell>
                <TableCell className='table-header-text'>Name</TableCell>
                <TableCell className='table-header-text'>Email</TableCell>
                <TableCell className='table-header-text'>Phone</TableCell>
                <TableCell className='table-header-text'>
                  Participants
                </TableCell>
                <TableCell className='table-header-text'>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signups.map((signup, i) => (
                <TableRow
                  key={i}
                  sx={{
                    backgroundColor:
                      i % 2 !== 0 ? 'rgba(0, 0, 0, .01)' : 'rgba(0, 0, 0, .07)',
                  }}
                >
                  <TableCell>
                    {/* <Typography
                      color={signup.paid ? green[500] : red[500]}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      {signup.paid ? 'Yes' : 'No'}
                    </Typography>
                    <Button
                      variant='contained'
                      sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        color: 'white',
                        padding: '4px 8px',
                      }}
                    >
                      Update
                    </Button> */}

                    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                      <Select
                        value={signup.paid}
                        onChange={(e) => handleUpdatePaidStatus(signup.id, e.target.value)}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{signup.signer_name}</TableCell>
                  <TableCell>{signup.signer_email}</TableCell>
                  <TableCell>{signup.signer_phone}</TableCell>
                  <TableCell>
                    {signup.participants.map((person, i) => {
                      return (
                        <Typography
                          key={i}
                          sx={{
                            whiteSpace: 'nowrap',
                            fontSize: '.9rem',
                          }}
                        >
                          {person.name}
                        </Typography>
                      )
                    })}
                  </TableCell>
                  <TableCell>{signup.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Collapse>
    </Card>
  )
}

export default SignupCollapse

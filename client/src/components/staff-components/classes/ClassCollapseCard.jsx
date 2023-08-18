import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  classNotOver,
  getClassTimeRange,
  getDateRange,
  getDaysAwayStr,
  getParticipantCount,
  isClassShowingPublicly,
} from '../../../utilityFunctions'
import { green, red } from '@mui/material/colors'

const ClassCollapseCard = ({ classObj, getAllSignups, handleEditSelect }) => {
  const {
    title,
    start_date,
    end_date,
    pic_url,
    short_desc,
    signups,
    start_time,
    end_time,
    per_cost,
  } = classObj

  const [isExpanded, setIsExpanded] = useState(false)
  const [textCopied, setTextCopied] = useState(false)
  const [payUpdateLoading, setPayUpdateLoading] = useState(false)
  const [signupToDelete, setSignupToDelete] = useState(null)

  function handleCopyAllEmails() {
    if (textCopied) return
    const emails = signups.map((signup) => signup.signer_email).join(', ')
    navigator.clipboard.writeText(emails)
    setTextCopied(true)
    setTimeout(() => setTextCopied(false), 1500)
  }

  function handleUpdatePaidStatus(signupId, paid, index) {
    setPayUpdateLoading(true)
    axios
      .put('/api/staff/signup/update/paid', {
        paid,
        signupId,
      })
      .then(({ data }) => {
        if (data.length) {
          signups[index].paid = !signups[index].paid
        } else {
          toast.error(
            'Error updating paid status. Please refresh the page and try again.'
          )
          console.error('Error updating paid status')
        }
      })
      .catch((err) => {
        console.error(err)
        toast.error(
          'Error updating paid status. Please refresh the page and try again.'
        )
      })
      .finally(() => setPayUpdateLoading(false))
  }

  function handleDeleteSignup(index) {
    setSignupToDelete(signups[index])
  }

  function handleApiDeleteSignup() {
    setPayUpdateLoading(true)
    axios
      .delete(`/api/staff/signup/delete/${signupToDelete.id}`)
      .then(({ data }) => {
        if (+data > 0) {
          toast.success('Signup deleted')
          setSignupToDelete(null)
          getAllSignups()
        } else {
          console.error('Error deleting signup')
          toast.error('Error deleting signup')
          setSignupToDelete(null)
        }
      })
      .catch(console.error)
      .finally(() => setPayUpdateLoading(false))
  }

  return (
    <>
      <Card
        elevation={4}
        sx={{
          minWidth: '910px',
          maxWidth: '1300px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <Box
            className='cursor-pointer'
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              width: '230px',
              minWidth: '230px',
              height: '200px',
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
              width: 'calc(100% - 220px)',
              maxWidth: 'calc(100% - 220px)',
              paddingRight: '1rem',
            }}
          >
            <Box
              sx={{
                padding: '.5rem',
                flex: 1,
                width: 'calc(100%)',
                maxWidth: 'calc(100% - 150px)',
              }}
            >
              <Stack
                direction='row'
                spacing={3}
                sx={{
                  alignItems: 'center',
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
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {classNotOver(end_date) ? (
                    <Chip
                      label={getDaysAwayStr(start_date, end_date)}
                      color='primary'
                    />
                  ) : (
                    <Chip
                      label={getDaysAwayStr(start_date, end_date)}
                      color='error'
                    />
                  )}
                  {isClassShowingPublicly(classObj) ? (
                    <Chip label='Class is visible to public' color='primary' />
                  ) : (
                    <Chip label='Class not visible' color='error' />
                  )}
                </Stack>
              </Stack>
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
                Price per participant: ${per_cost}
              </Typography>
              <Typography className='no-wrap-ellipsis'>
                Signups:{' '}
                <span style={{ fontWeight: 'bold', color: green[700] }}>
                  {signups.length}
                </span>
              </Typography>
              <Typography className='no-wrap-ellipsis'>
                Participants:{' '}
                <span style={{ fontWeight: 'bold', color: green[700] }}>
                  {getParticipantCount(signups)}
                </span>
              </Typography>
            </Box>

            <Stack
              gap={3}
              sx={{
                alignItems: 'center',
              }}
            >
              <Button
                variant='contained'
                size='small'
                onClick={() => handleEditSelect(classObj)}
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                Edit class
              </Button>
              {isExpanded ? (
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  <ExpandLessIcon fontSize='large' />
                </IconButton>
              ) : (
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  <ExpandMoreIcon fontSize='large' />
                </IconButton>
              )}
            </Stack>
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
                  <TableCell className='table-header-text'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {signups.map((signup, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      backgroundColor:
                        i % 2 !== 0
                          ? 'rgba(0, 0, 0, .01)'
                          : 'rgba(0, 0, 0, .07)',
                    }}
                  >
                    <TableCell>
                      {payUpdateLoading ? (
                        <CircularProgress sx={{ margin: '0 48px' }} />
                      ) : (
                        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                          <Select
                            value={signup.paid}
                            onChange={(e) =>
                              handleUpdatePaidStatus(
                                signup.id,
                                e.target.value,
                                i
                              )
                            }
                            sx={{ color: signup.paid ? green[600] : red[500] }}
                          >
                            <MenuItem sx={{ color: green[600] }} value={true}>
                              ✅ Yes
                            </MenuItem>
                            <MenuItem sx={{ color: red[500] }} value={false}>
                              ❌ No
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
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
                    <TableCell>
                      <IconButton onClick={() => handleDeleteSignup(i)}>
                        <DeleteIcon color='error' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Collapse>
      </Card>

      <Dialog open={!!signupToDelete} onClose={() => setSignupToDelete(null)}>
        <DialogTitle>Are you sure you want to delete this signup?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={payUpdateLoading}
            color='info'
            onClick={() => setSignupToDelete(null)}
          >
            Cancel
          </Button>
          <Button
            disabled={payUpdateLoading}
            color='error'
            onClick={handleApiDeleteSignup}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ClassCollapseCard

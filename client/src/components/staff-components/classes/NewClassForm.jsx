import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
  Divider,
  FormHelperText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { StaffContext } from '../../../context/StaffContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { blue } from '@mui/material/colors'
import axios from 'axios'
import { toast } from 'react-toastify'

const defaultClassData = {
  title: '',
  short_desc: '',
  full_desc: '',
  other_info: '',
  pic_url: '',
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  min_age: 8,
  max_age: 100,
  per_cost: '',
  location: '',
  href: '',
  need_guardian_signup: false,
  active: true,
  auto_show_by_date: true,
  class_type: 'class',
}

const NewClassForm = ({
  saveFormSession = true,
  showForm,
  setShowForm,
  handleFormSubmit,
  classData = defaultClassData,
  editing = false,
}) => {
  const {
    title,
    short_desc,
    full_desc,
    other_info,
    pic_url,
    start_date,
    end_date,
    start_time,
    end_time,
    min_age,
    max_age,
    per_cost,
    location,
    need_guardian_signup,
    active: isActive,
    auto_show_by_date,
    class_type,
  } = classData
  const { loading, setLoading, getAllClasses } = useContext(StaffContext)
  const [formError, setFormError] = useState('')
  const [classTitle, setClassTitle] = useState(title)
  const [imgUrl, setImgUrl] = useState(pic_url)
  const [classType, setClassType] = useState(class_type)
  const [shortDesc, setShortDesc] = useState(short_desc)
  const [fullDesc, setFullDesc] = useState(full_desc)
  const [otherInfo, setOtherInfo] = useState(other_info)
  const [locationStr, setLocationStr] = useState(location)
  const [guardianSignup, setGuardianSignup] = useState(need_guardian_signup)
  const [isMultiDay, setIsMultiDay] = useState(start_date !== end_date)
  const [startDate, setStartDate] = useState(
    start_date ? dayjs(start_date) : dayjs()
  )
  const [endDate, setEndDate] = useState(end_date ? dayjs(end_date) : dayjs())
  const [startTime, setStartTime] = useState(
    start_time ? dayjs(start_time) : null
  )
  const [endTime, setEndTime] = useState(end_time ? dayjs(end_time) : null)
  const [minAge, setMinAge] = useState(min_age)
  const [maxAge, setMaxAge] = useState(max_age)
  const [pricePer, setPricePer] = useState(per_cost)
  const [active, setActive] = useState(isActive)
  const [autoShowByDate, setAutoShowByDate] = useState(auto_show_by_date)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showClassDeleteWarningDialog, setShowClassDeleteWarningDialog] =
    useState(false)

  function handleDeleteClass() {
    setDeleteLoading(true)
    axios
      .delete(`/api/staff/classes/delete/${classData.id}`)
      .then(({ data }) => {
        if (+data > 0) {
          toast.success(`${classData.title ? classData.title : 'Class'} deleted!`)
          setShowClassDeleteWarningDialog(false)
          getAllClasses()
          setShowForm(false)
        } else {
          toast.error('Error deleting class')
          console.error('error deleting class')
        }
      })
      .catch(console.error)
      .finally(() => setDeleteLoading(false))
  }

  const ageChoices = [
    { label: 'no minimum age', value: 0 },
    { label: 'no age limit', value: 100 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
  ]

  function handleSubmitNewClass() {
    if (!validateFormValues()) return

    const newClass = {
      title: classTitle,
      short_desc: shortDesc,
      full_desc: fullDesc,
      other_info: otherInfo,
      pic_url: imgUrl,
      start_date: startDate.$d,
      end_date: isMultiDay ? endDate.$d : startDate.$d,
      start_time: startTime.$d,
      end_time: endTime.$d,
      min_age: minAge,
      max_age: maxAge,
      location: locationStr,
      per_cost: +pricePer,
      href: classTitle.toLowerCase().split(' ').join('-'),
      need_guardian_signup: guardianSignup,
      active: active,
      auto_show_by_date: autoShowByDate,
      class_type: classType,
    }

    handleFormSubmit(newClass)
  }

  useEffect(() => {
    if (!saveFormSession) return
    // if any of the session storage values exist on render, set the state to those values
    if (sessionStorage.getItem('classTitle'))
      setClassTitle(sessionStorage.getItem('classTitle'))
    if (sessionStorage.getItem('imgUrl'))
      setImgUrl(sessionStorage.getItem('imgUrl'))
    if (sessionStorage.getItem('classType'))
      setClassType(sessionStorage.getItem('classType'))
    if (sessionStorage.getItem('shortDesc'))
      setShortDesc(sessionStorage.getItem('shortDesc'))
    if (sessionStorage.getItem('fullDesc'))
      setFullDesc(sessionStorage.getItem('fullDesc'))
    if (sessionStorage.getItem('otherInfo'))
      setOtherInfo(sessionStorage.getItem('otherInfo'))
    if (sessionStorage.getItem('locationStr'))
      setLocationStr(sessionStorage.getItem('locationStr'))
    if (sessionStorage.getItem('isMultiDay'))
      setIsMultiDay(JSON.parse(sessionStorage.getItem('isMultiDay')))
    if (sessionStorage.getItem('startDate'))
      setStartDate(dayjs(sessionStorage.getItem('startDate')))
    if (sessionStorage.getItem('endDate'))
      setEndDate(dayjs(sessionStorage.getItem('endDate')))
    if (sessionStorage.getItem('startTime'))
      setStartTime(dayjs(sessionStorage.getItem('startTime')))
    if (sessionStorage.getItem('endTime'))
      setEndTime(dayjs(sessionStorage.getItem('endTime')))
    if (sessionStorage.getItem('pricePer'))
      setPricePer(JSON.parse(sessionStorage.getItem('pricePer')))
    if (sessionStorage.getItem('active'))
      setActive(JSON.parse(sessionStorage.getItem('active')))
    if (sessionStorage.getItem('autoShowByDate'))
      setAutoShowByDate(JSON.parse(sessionStorage.getItem('autoShowByDate')))
    if (sessionStorage.getItem('guardianSignup'))
      setGuardianSignup(JSON.parse(sessionStorage.getItem('guardianSignup')))
    if (sessionStorage.getItem('minAge'))
      setMinAge(JSON.parse(sessionStorage.getItem('minAge')))
    if (sessionStorage.getItem('maxAge'))
      setMaxAge(JSON.parse(sessionStorage.getItem('maxAge')))
  }, [])

  useEffect(() => {
    setFormError('')
    if (!saveFormSession) return
    // place each value into session storage as it is changed
    sessionStorage.setItem('classTitle', classTitle)
    sessionStorage.setItem('imgUrl', imgUrl)
    sessionStorage.setItem('classType', classType)
    sessionStorage.setItem('shortDesc', shortDesc)
    sessionStorage.setItem('fullDesc', fullDesc)
    sessionStorage.setItem('otherInfo', otherInfo)
    sessionStorage.setItem('locationStr', locationStr)
    sessionStorage.setItem('isMultiDay', isMultiDay)
    sessionStorage.setItem('startDate', startDate.$d)
    sessionStorage.setItem('endDate', endDate.$d)
    if (startTime) {
      sessionStorage.setItem('startTime', startTime.$d)
    }
    if (endTime) {
      sessionStorage.setItem('endTime', endTime.$d)
    }
    sessionStorage.setItem('pricePer', pricePer)
    sessionStorage.setItem('active', active)
    sessionStorage.setItem('autoShowByDate', autoShowByDate)
    sessionStorage.setItem('guardianSignup', guardianSignup)
    sessionStorage.setItem('minAge', minAge)
    sessionStorage.setItem('maxAge', maxAge)
  }, [
    classTitle,
    imgUrl,
    classType,
    shortDesc,
    fullDesc,
    otherInfo,
    locationStr,
    guardianSignup,
    isMultiDay,
    startDate,
    endDate,
    startTime,
    endTime,
    pricePer,
    active,
    autoShowByDate,
    minAge,
    maxAge,
  ])

  function validateFormValues() {
    if (!classTitle.trim()) {
      setFormError('Please enter a class title')
      return false
    } else setClassTitle(classTitle.trim())
    if (!imgUrl.trim()) {
      setFormError('Please enter an image url')
      return false
    } else setImgUrl(imgUrl.trim())
    if (!shortDesc.trim()) {
      setFormError('Please enter a short description')
      return false
    } else setShortDesc(shortDesc.trim())
    if (!fullDesc.trim()) {
      setFormError('Please enter a full description')
      return false
    } else setFullDesc(fullDesc.trim())
    if (!locationStr.trim()) {
      setFormError('Please enter a location')
      return false
    } else setLocationStr(locationStr.trim())
    if (!startDate) {
      setFormError('Please enter a start date')
      return false
    }
    if (!endDate || !isMultiDay) {
      setEndDate(startDate)
    }
    if (!startTime) {
      setFormError('Please enter a start time')
      return false
    }
    if (!endTime) {
      setFormError('Please enter an end time')
      return false
    }
    if (!pricePer) {
      setFormError('Please enter a price per participant')
      return false
    }
    if (imgUrl.length > 999) {
      setFormError('Image url is too long (max 999 characters)')
      return false
    }
    // check if the endDate is before the startDate
    if (endDate.isBefore(startDate)) {
      setFormError('End date must be after start date')
      return false
    }
    // check if the endTime is before the startTime
    if (endTime.isBefore(startTime)) {
      setFormError('End time must be after start time')
      return false
    }
    return true
  }

  return (
    <>
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        sx={{
          '& .MuiDialog-paper': {
            padding: '20px',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'flex-start',
            width: 'min(700px, 100% - 15px)',
          },
        }}
      >
        <Typography variant='h6'>
          {editing ? 'Edit class' : 'Add new class'}
        </Typography>
        <form
          style={{
            // width: 'min(400px, 100vw - 30px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextField
            disabled={loading}
            fullWidth
            label='Class title'
            required
            size='small'
            variant='outlined'
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
          />

          <Divider>
            <Typography
              sx={{
                opacity: 0.7,
              }}
            >
              Class cover image
            </Typography>
          </Divider>

          <Typography
            sx={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            Visit
            <a
              href='https://unsplash.com'
              target='_blank'
              rel="noreferrer"
              style={{
                color: blue[600],
                cursor: 'pointer',
                width: 'fit-content',
              }}
              underline='hover'
            >
              unsplash.com
            </a>
            for copyright-free images
          </Typography>

          <section
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <TextField
              disabled={loading}
              fullWidth
              label='Image url'
              required
              size='small'
              variant='outlined'
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              error={imgUrl.length >= 999}
              helperText={
                imgUrl.length >= 999
                  ? `Too many characters ${imgUrl.length}/999`
                  : 'Right click on a public image (not copyrighted) and select "copy image address", then paste that url here.'
              }
            />
            <Button
              onClick={() => {
                navigator.clipboard.readText().then((text) => setImgUrl(text))
              }}
              size='small'
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >Paste</Button>
            <IconButton onClick={() => setImgUrl('')}>
              <DeleteOutlineIcon color='error' />
            </IconButton>
          </section>

          <section
            style={{
              display: 'flex',
              gap: '.6rem',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '170px',
                minWidth: '170px',
                height: '130px',
                backgroundColor: 'rgba(0,0,0,.3)',
                borderRadius: '6px',
              }}
            />
            <Typography>
              Image preview (if it doesn't show, the url is invalid)
            </Typography>
          </section>

          <Divider>
            <Typography
              sx={{
                opacity: 0.7,
              }}
            >
              Class description
            </Typography>
          </Divider>

          <FormControl size='small' fullWidth>
            <InputLabel>Class Type</InputLabel>
            <Select
              value={classType}
              label='Class type'
              onChange={(e) => setClassType(e.target.value)}
            >
              <MenuItem value='class'>Class</MenuItem>
              <MenuItem value='summer_camp'>Summer camp</MenuItem>
            </Select>
          </FormControl>

          <TextField
            disabled={loading}
            fullWidth
            label='Class short description'
            required
            size='small'
            variant='outlined'
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            multiline
            minRows={3}
            maxRows={6}
            helperText={`The description to show on a preview for the class. Aim for 70 - 100 characters. (${shortDesc.length} / 100)`}
          />
          <TextField
            disabled={loading}
            fullWidth
            label='Class full description'
            required
            size='small'
            variant='outlined'
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            multiline
            minRows={5}
            maxRows={10}
          />
          <TextField
            disabled={loading}
            fullWidth
            label='Class other info'
            size='small'
            variant='outlined'
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            multiline
            minRows={3}
            maxRows={6}
          />

          <TextField
            disabled={loading}
            fullWidth
            label='Location'
            required
            size='small'
            variant='outlined'
            value={locationStr}
            onChange={(e) => setLocationStr(e.target.value)}
            multiline
            minRows={1}
            maxRows={3}
            helperText='Enter a location as exact as appropriate. If held at a private residence, maybe just "Pleasant Grove, UT", or if at a facility, enter the full address.'
          />

          <Divider>
            <Typography sx={{ opacity: 0.7 }}>Dates</Typography>
          </Divider>

          <FormGroup>
            <FormControlLabel
              label='More than one day'
              control={
                <Switch
                  checked={isMultiDay}
                  onChange={(e) => setIsMultiDay(e.target.checked)}
                />
              }
            />
          </FormGroup>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label='Start Date'
              value={startDate}
              onChange={(newVal) => setStartDate(newVal)}
            />
          </LocalizationProvider>

          {isMultiDay && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label='End Date'
                value={endDate}
                onChange={(newVal) => setEndDate(newVal)}
              />
            </LocalizationProvider>
          )}

          <Divider>
            <Typography sx={{ opacity: 0.7 }}>Times</Typography>
          </Divider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label='Start time'
              value={startTime}
              onChange={(newVal) => setStartTime(newVal)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label='End time'
              value={endTime}
              onChange={(newVal) => setEndTime(newVal)}
            />
          </LocalizationProvider>

          <Divider>
            <Typography sx={{ opacity: 0.7 }}>Requirements</Typography>
          </Divider>

          <section className='age-limit-section'>
            <FormControl size='small' fullWidth>
              <InputLabel>Minimum age</InputLabel>
              <Select
                label='Minimum age'
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                autoWidth
              >
                {ageChoices.map((choice, i) => {
                  if (choice.value === 100) return
                  return (
                    <MenuItem key={i} value={choice.value}>
                      {choice.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl size='small' fullWidth>
              <InputLabel>Age limit</InputLabel>
              <Select
                value={maxAge}
                label='Age limit'
                onChange={(e) => setMaxAge(e.target.value)}
                autoWidth
              >
                {ageChoices.map((choice, i) => {
                  if (choice.value === 0) return
                  return (
                    <MenuItem key={i} value={choice.value}>
                      {choice.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </section>

          <FormControl>
            <InputLabel>Cost per participant</InputLabel>
            <OutlinedInput
              required
              type='number'
              size='small'
              label='Cost per participant'
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
              value={pricePer}
              onChange={(e) => setPricePer(e.target.value)}
            />
          </FormControl>

          <FormGroup>
            <FormControlLabel
              label='Guardian signup'
              control={
                <Switch
                  checked={guardianSignup}
                  onChange={(e) => setGuardianSignup(e.target.checked)}
                />
              }
            />
            <FormHelperText>
              Is it more likely that participants will sign up themselves, or a
              guardian sign them up?
            </FormHelperText>
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              label='Active'
              control={
                <Switch
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              }
            />
            <FormHelperText>
              If checked, the class can be displayed on the public site.
            </FormHelperText>
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              label='Auto show by date'
              control={
                <Switch
                  checked={autoShowByDate}
                  onChange={(e) => setAutoShowByDate(e.target.checked)}
                />
              }
            />
            <FormHelperText>
              If checked, the class will not be shown on the public site once
              the end date has passed.
            </FormHelperText>
          </FormGroup>
        </form>

        {editing && (
          <>
            <Divider flexItem>Delete class</Divider>

            <Button
              color='error'
              size='small'
              variant='outlined'
              onClick={() => setShowClassDeleteWarningDialog(true)}
              endIcon={<DeleteOutlineIcon />}
              sx={{
                fontSize: '.9rem',
                textTransform: 'none',
              }}
            >
              Delete this class
            </Button>
            <Divider flexItem />
          </>
        )}

        <Typography variant='body1' color='red'>
          {formError}
        </Typography>

        <section className='flex-gap-15'>
          <Button
            color='secondary'
            disabled={loading}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
            onClick={() => setShowForm(!showForm)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            disabled={loading || !!formError}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '1.1rem',
            }}
            onClick={handleSubmitNewClass}
          >
            {editing ? 'Save' : 'Create class'}
          </Button>
        </section>
      </Dialog>

      <Dialog
        open={showClassDeleteWarningDialog}
        onClose={() => setShowClassDeleteWarningDialog(false)}
        sx={{
          '& .MuiDialog-paper': {
            padding: '15px',
            margin: '10px',
          },
        }}
      >
        <DialogTitle>Are you sure you want to delete this class?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            This action cannot be undone. If this class has signups, you will
            need to inform the participants that the class has been cancelled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={deleteLoading}
            color='info'
            onClick={() => setShowClassDeleteWarningDialog(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={deleteLoading}
            color='error'
            onClick={handleDeleteClass}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewClassForm

import dayjs from 'dayjs'

function formatClassDates(date) {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month} ${day}, ${year}`
}

function getDateRange(start_date, end_date) {
  if (start_date === end_date) {
    return formatClassDates(start_date)
  } else {
    return formatClassDates(start_date) + ' - ' + formatClassDates(end_date)
  }
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

function getClassTimeRange(start_time, end_time) {
  return formatClassTimes(start_time) + ' - ' + formatClassTimes(end_time)
}

function getAgeRange(min_age, max_age) {
  if (min_age === max_age) {
    return min_age
  } else if (min_age === 0 && max_age < 100) {
    return max_age + ' and under'
  } else if (min_age > 0 && max_age === 100) {
    return min_age + ' and up'
  } else if (min_age > 0 && max_age < 100) {
    return min_age + ' - ' + max_age
  } else if (min_age === 0 && max_age === 100) {
    return 'All ages'
  }
}

function getParticipantCount(signupsArr) {
  let count = 0
  signupsArr.forEach((signup) => {
    count += signup.participants.length
  })
  return count
}

function classNotOver(end_date) {
  const currentDate = dayjs().startOf('day')
  const endDate = dayjs(end_date).startOf('day')
  return endDate.isSame(currentDate) || endDate.isAfter(currentDate)
}

function getDaysFromClassDates(start_date, end_date) {
  const currentDate = dayjs().startOf('day')
  const startDate = dayjs(start_date).startOf('day')
  const endDate = dayjs(end_date).startOf('day')

  if (endDate.isBefore(currentDate)) {
    return `-${currentDate.diff(endDate, 'day')}`
  } else if (
    currentDate.isSame(startDate) ||
    currentDate.isSame(endDate) ||
    currentDate.isBetween(startDate, endDate)
  ) {
    return 0
  } else if (currentDate.isBefore(startDate)) {
    return startDate.diff(currentDate, 'day')
  }
  return null // Return null for invalid date ranges
}

function isClassShowingPublicly(classObj) {
  const { active, end_date, auto_show_by_date } = classObj
  if (!active) return false
  if (!auto_show_by_date) return true
  if (classNotOver(end_date)) {
    return true
  } else {
    return false
  }
}

function getDaysAwayStr(start_date, end_date) {
  const daysAway = getDaysFromClassDates(start_date, end_date)

  if (daysAway === 0) {
    return 'Happening now'
  } else if (daysAway > 0) {
    return `Starts in ${daysAway} day${daysAway > 1 ? 's' : ''}`
  } else if (daysAway < 0) {
    return `Ended ${Math.abs(daysAway)} day${
      Math.abs(daysAway) > 1 ? 's' : ''
    } ago`
  }
}

function getAgeRangeOptions(min_age, max_age) {
  const options = []
  if (min_age === 0 && max_age < 100) {
    for (let i = 0; i <= max_age; i++) {
      options.push(+i)
    }
    return options
  } else if (min_age > 0 && max_age === 100) {
    for (let i = min_age; i <= 18; i++) {
      options.push(+i)
    }
    options.push('Over 18')
  } else if (min_age > 0 && max_age < 100) {
    for (let i = min_age; i <= max_age; i++) {
      options.push(+i)
    }
  } else if (min_age === 0 && max_age === 100) {
    for (let i = 0; i <= 18; i++) {
      options.push(+i)
    }
    options.push('Over 18')
  }
  return options
}

function filterOrderClasses(classes, current = true) {
  let filteredClasses
  if (current) {
    filteredClasses = classes.filter((classObj) => {
      return classNotOver(classObj.end_date)
    })
  } else {
    filteredClasses = classes.filter((classObj) => {
      return !classNotOver(classObj.end_date)
    })
  }
  // Sort classes by start_date
  filteredClasses.sort((a, b) => {
    const aDate = dayjs(a.start_date).startOf('day')
    const bDate = dayjs(b.start_date).startOf('day')
    if (aDate.isBefore(bDate)) {
      return current ? -1 : 1
    } else if (aDate.isAfter(bDate)) {
      return current ? 1 : -1
    } else {
      return 0
    }
  })
  return filteredClasses
}

export {
  formatClassDates,
  formatClassTimes,
  getDateRange,
  getAgeRange,
  getParticipantCount,
  getClassTimeRange,
  classNotOver,
  getDaysFromClassDates,
  getDaysAwayStr,
  isClassShowingPublicly,
  filterOrderClasses,
  getAgeRangeOptions,
}

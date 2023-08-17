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

export {
  formatClassDates,
  formatClassTimes,
  getDateRange,
  getAgeRange,
  getParticipantCount,
  getClassTimeRange,
}

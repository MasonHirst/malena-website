const dayjs = require("dayjs")

function classNotOver(end_date) {
  const currentDate = dayjs().startOf('day')
  const endDate = dayjs(end_date).startOf('day')
  return endDate.isSame(currentDate) || endDate.isAfter(currentDate)
}

module.exports = {
  classNotOver,
}
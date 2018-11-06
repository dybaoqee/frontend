import moment from 'moment'

const MONTH_KEY_FORMAT = 'YYYY-MM'
const DAY_KEY_FORMAT = 'YYYY-MM-DD'

const getTourMonths = (timeList) => {
  const tourMonths = {}
  timeList.forEach((item) => {
    const parser = moment(item)
    const display = parser.format('MMMM [de] YYYY')
    const key = parser.format(MONTH_KEY_FORMAT)

    if (!tourMonths[key]) {
      tourMonths[key] = {
        date: new Date(item),
        display: display
      }
    }
  })
  return tourMonths
}

const getTourDays = (timeList, month) => {
  const tourDays = {}
  timeList.forEach((item) => {
    const date = new Date(item)
    if (date.getMonth() !== month) return

    const parser = moment(item)
    const key = parser.format(DAY_KEY_FORMAT)

    if (!tourDays[key]) {
      tourDays[key] = {
        date,
        day: parser.format('DD'),
        dayOfWeek: parser.format('ddd')
      }
    }
  })
  return tourDays
}

const getTourHours = (timeList, date) => {
  const tourHours = []
  timeList.forEach((item) => {
    const parser = moment(item)
    const itemDate = parser.format(DAY_KEY_FORMAT)
    if (date !== itemDate) return
    tourHours.push(parser.format('HH'))
  })
  return tourHours
}

export {
  getTourMonths,
  getTourDays,
  getTourHours
}
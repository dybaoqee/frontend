import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

const MONTH_KEY_FORMAT = 'YYYY-MM'
const DAY_KEY_FORMAT = 'YYYY-MM-DD'

const getTourMonths = (timeList) => {
  const tourMonths = {}
  timeList.forEach((item) => {
    const parser = moment(item)
    const display = parser.format('MMMM [de] YYYY')
    const upperCaseDisplay = display.charAt(0).toUpperCase() + display.slice(1)
    const key = parser.format(MONTH_KEY_FORMAT)

    if (!tourMonths[key]) {
      tourMonths[key] = {
        key,
        date: new Date(item),
        display: upperCaseDisplay
      }
    }
  })
  return Object.values(tourMonths).reverse()
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
        key,
        date,
        day: parser.format('DD'),
        dayOfWeek: parser.format('ddd')
      }
    }
  })
  return Object.values(tourDays)
}

const TOUR_HOURS = ['09', '10', '11', '12', '13', '14', '15', '16', '17']

export {
  getTourMonths,
  getTourDays,
  TOUR_HOURS
}
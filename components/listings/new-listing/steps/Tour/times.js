import moment from 'moment'

const getTourOptions = (timeList) => {
  const tourOptions = {}
  timeList.forEach((item) => {
    const parser = moment(item)
    const date = parser.format('DD/MM/YYYY')
    const day = parser.format('DD')
    const dayOfWeek = parser.format('ddd')
    const hour = parser.format('HH')

    if (!tourOptions[date]) {
      tourOptions[date] = {
        day,
        dayOfWeek
      }
    }

    if (!tourOptions[date].times) {
      tourOptions[date].times = []
    }
    tourOptions[date].times.push(hour)
  })
  return tourOptions
}

export {
  getTourOptions
}
import {
  getTourMonths,
  getTourDays,
  getDateDisplay,
  getFullTourDateDisplay
} from 'components/listings/new-listing/lib/times'

const fullList = [
  '2018-11-16T09:15:57.739175',
  '2018-11-16T17:15:57.739175',
  '2018-11-15T09:15:57.739175',
  '2018-11-15T17:15:57.739175',
  '2018-11-14T09:15:57.739175',
  '2018-11-14T17:15:57.739175',
  '2018-11-13T09:15:57.739175',
  '2018-11-13T17:15:57.739175',
  '2018-11-12T09:15:57.739175',
  '2018-11-12T17:15:57.739175'
]

describe('Tour dates', () => {
  it('should return a list of unique tour months', () => {
    const tourMonths = getTourMonths(fullList)
    expect(tourMonths.length).toBe(1)
  })

  it('should return a list of unique days of the given month', () => {
    const tourDays = getTourDays(fullList, 10)
    expect(tourDays.length).toBe(5)
  })

  it('should format date value into user friendly date', () => {
    const date = '2018-11-23'
    expect(getDateDisplay(date)).toBe('23/11/18')
  })

  it('should return a formatted tour date display', () => {
    const tour = {
      day: '2018-11-26',
      time: '09',
    }
    const tourTimeDisplay = getFullTourDateDisplay(tour)
    expect(tourTimeDisplay).toBe('26/11/2018 - às 09h')
  })

  it('should return a formatted tour date display with a time range', () => {
    const tour = {
      day: '2018-11-26',
      time: '09',
      timeRange: ['09', '12']
    }
    const tourTimeDisplay = getFullTourDateDisplay(tour)
    expect(tourTimeDisplay).toBe('26/11/2018 - entre 09h e 12h')
  })

  it('should return an empty tour time display when no tour value is given', () => {
    const tour = {}
    const tourTimeDisplay = getFullTourDateDisplay(tour)
    expect(tourTimeDisplay).toBe('00/00/0000 - entre 00h e 00h')
  })
})

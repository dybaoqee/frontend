import {
  getTourMonths,
  getTourDays,
  getDateDisplay
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
})

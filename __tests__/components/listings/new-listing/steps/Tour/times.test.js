import { getTourOptions } from 'components/listings/new-listing/steps/Tour/times'

const fullTimeList = [
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
  it('should return grouped tour dates given a list of dateTimes', () => {
    const tourOptions = getTourOptions(fullTimeList)
    expect(Object.keys(tourOptions).length).toBe(5)
  })
})

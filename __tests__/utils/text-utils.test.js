import {
  currencyToInt,
  roundUpPrice
} from 'utils/text-utils'

describe('text utils', () => {
  it('should transform currency display value into an integer', () =>{
    const displayValue = 'R$ 200.000'
    const intValue = currencyToInt(displayValue)
    expect(intValue).toBe(200000)
  })

  it('should round up a price value', () => {
    const price = 1234567
    const roundedPrice = roundUpPrice(price)
    expect(roundedPrice).toBe(1230000)
  })
})

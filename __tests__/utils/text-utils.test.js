import {
  currencyToInt
} from 'utils/text-utils'

describe('text utils', () => {
  it('should transform currency display value into an integer', () =>{
    const displayValue = 'R$ 200.000'
    const intValue = currencyToInt(displayValue)
    expect(intValue).toBe(200000)
  })
})

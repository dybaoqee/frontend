import { displayPriceToInt } from 'utils/text-utils'

describe('text utils', () => {
  it('should transform display currency value into an integer', () =>{
    const displayPrice = 'R$ 200.000'
    const intPrice = displayPriceToInt(displayPrice)
    expect(intPrice).toBe(200000)
  })
})

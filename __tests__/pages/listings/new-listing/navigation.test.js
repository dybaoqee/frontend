import {
  getScreen,
  getStepEntry,
  getStepDisplay,
  getKeyFromDisplay
} from 'pages/listings/new-listing/navigation'

describe('new-listing navigation functions', () => {
  it('should return the key given the key display', () => {
    const display = 'bem-vindo'
    const key = getKeyFromDisplay(display)
    expect(key).toBe('intro')
  })
})

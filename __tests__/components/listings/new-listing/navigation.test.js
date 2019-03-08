import {
  getStepEntry,
  getStepDisplay,
  getKeyFromDisplay
} from 'components/listings/new-listing/navigation'

describe('new-listing navigation functions', () => {
  it('should return the key given the key display', () => {
    const display = 'bem-vindo'
    const key = getKeyFromDisplay(display)
    expect(key).toBe('intro')
  })

  it('should return intro when no key is found with the given display name', () => {
    const display = 'this-step-does-not-exist'
    const key = getKeyFromDisplay(display)
    expect(key).toBe('intro')
  })

  it('should return the correct step entry given a navigation key', () => {
    const key = 'intro'
    const step = getStepEntry(key)
    expect(step).toEqual({"canNavigateTo": ["homeDetails", "notifyCoverage", "addressInputMobile"], "component": expect.any(Function), "display": "endereco"})
  })

  it('should return the correct step display given a navigation key', () => {
    const key = 'addressInputMobile'
    const display = getStepDisplay(key)
    expect(display).toBe('endereco-mobile')
  })
})

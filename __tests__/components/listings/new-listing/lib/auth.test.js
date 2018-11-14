import { hasPhoneNumber } from 'components/listings/new-listing/lib/auth'

describe('auth functions for seller onboarding', () => {
  it('should check that user has phone number', () => {
    const phone = {
      internationalCode: 55,
      localAreaCode: 11,
      number: 123456789
    }
    expect(hasPhoneNumber(phone)).toBe(true)
  })

  it('should return false given a null phone', () => {
    const phone = null
    expect(hasPhoneNumber(phone)).toBe(false)
  })

  it('should return false given an incomplete phone object', () => {
    const phone = {
      internationalCode: null,
      localAreaCode: 11,
      number: null
    }
    expect(hasPhoneNumber(phone)).toBe(false)
  })
})

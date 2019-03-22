import {
  getSellerEventPrefix,
  SELLER_ONBOARDING_EVENT_BASE,
  SELLER_EVALUATION_EVENT_BASE
} from 'lib/logging'

describe('logging tests', () => {
  it('should return the seller onboarding prefix when evaluation is false', () => {
    const evaluation = false
    const prefix = getSellerEventPrefix(evaluation)
    expect(prefix).toBe(SELLER_ONBOARDING_EVENT_BASE)
  })

  it('should return the seller onboarding prefix when evaluation is not present', () => {
    const prefix = getSellerEventPrefix()
    expect(prefix).toBe(SELLER_ONBOARDING_EVENT_BASE)
  })

  it('should return the seller evaluation prefix when evaluation is true', () => {
    const evaluation = true
    const prefix = getSellerEventPrefix(evaluation)
    expect(prefix).toBe(SELLER_EVALUATION_EVENT_BASE)
  })

  it('should return the seller onboarding prefix when in the last steps even when evaluation is true', () => {
    const evaluation = true
    expect(getSellerEventPrefix(evaluation, 'services')).toBe(SELLER_ONBOARDING_EVENT_BASE)
    expect(getSellerEventPrefix(evaluation, 'tour')).toBe(SELLER_ONBOARDING_EVENT_BASE)
    expect(getSellerEventPrefix(evaluation, 'success')).toBe(SELLER_ONBOARDING_EVENT_BASE)
  })
})
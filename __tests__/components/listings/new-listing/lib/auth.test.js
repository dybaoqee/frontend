import { isAuthenticated, isNewUser } from 'components/listings/new-listing/lib/auth'

describe('auth functions for seller onboarding', () => {
  it('should return not authenticated if no auth data is found', () => {
    const authenticated = false
    const userInfo = null
    expect(isAuthenticated(authenticated, userInfo)).toBe(false)
  })

  it('should return true when checking if user is authenticated with legacy auth prop', () => {
    const authenticated = true
    const userInfo = null
    expect(isAuthenticated(authenticated, userInfo)).toBe(true)
  })

  it('should consider user authenticated if user info includes phone', () => {
    const authenticated = false
    const userInfo = {
      phone: '111'
    }
    expect(isAuthenticated(authenticated, userInfo)).toBe(true)
  })

  it('should return true when checking if user is new if user has no name', () => {
    const authenticated = false
    const userInfo = {
      name: null
    }
    expect(isNewUser(authenticated, userInfo)).toBe(true)
  })
})

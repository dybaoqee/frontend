import { getPhoneParts } from 'lib/user'

describe('user functions', () => {
  it('should return parts of the phone number', () => {
    const phone = '5511987654321'
    const phoneObject = getPhoneParts(phone)
    const { internationalCode, localAreaCode, number } = phoneObject
    expect(internationalCode).toBe('55')
    expect(localAreaCode).toBe('11')
    expect(number).toBe('987654321')
  })
})

import {
  getPhoneParts,
  getPhoneDisplay
} from 'lib/user'

describe('user functions', () => {
  it('should return parts of the phone number', () => {
    const phone = '11987654321'
    const phoneObject = getPhoneParts(phone)
    const { localAreaCode, number } = phoneObject
    expect(localAreaCode).toBe('11')
    expect(number).toBe('987654321')
  })

  it('should return parts of the phone number, when it has international code', () => {
    const phone = '5511987654321'
    const phoneObject = getPhoneParts(phone)
    const { localAreaCode, number } = phoneObject
    expect(localAreaCode).toBe('11')
    expect(number).toBe('987654321')
  })

  it('should return parts of the phone number, when it has international code with plus sign', () => {
    const phone = '+5511987654321'
    const phoneObject = getPhoneParts(phone)
    const { localAreaCode, number } = phoneObject
    expect(localAreaCode).toBe('11')
    expect(number).toBe('987654321')
  })

  it('should return parts of the phone number, when it has "undefined" for international code', () => {
    const phone = 'undefined11987654321'
    const phoneObject = getPhoneParts(phone)
    const { localAreaCode, number } = phoneObject
    expect(localAreaCode).toBe('11')
    expect(number).toBe('987654321')
  })

  it('should return the phone display string', () => {
    const localAreaCode = '11'
    const number = '987654321'
    const phoneDisplay = getPhoneDisplay({localAreaCode, number})
    expect(phoneDisplay).toBe('(11) 987654321')
  })
})

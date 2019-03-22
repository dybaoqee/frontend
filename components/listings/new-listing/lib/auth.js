import { getUserInfo, getPhoneParts } from 'lib/user'

export const BRAZIL_CODE = '+55'

export const getUser = async (id, updatePhone) => {
  const userInfo = await getUserInfo(id)
  if (userInfo && !userInfo.error) {
    // Update user info in redux
    const fullPhone = getPhoneParts(userInfo.phone)
    const name = userInfo.name
    updatePhone({
      name: name,
      localAreaCode: fullPhone.localAreaCode,
      number: fullPhone.number
    })
  }

  return userInfo
}

export const hasPhoneNumber = (phone) => {
  if (!phone) {
    return false
  }
  const { localAreaCode, number } = phone
  return (
    localAreaCode !== null &&
    number !== null
  )
}

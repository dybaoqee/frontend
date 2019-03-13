import { getUserInfo, getPhoneParts } from 'lib/user'

const getUser = async (id, updatePhone) => {
  const userInfo = await getUserInfo(id)
  if (userInfo && !userInfo.error) {
    // Update user info in redux
    const fullPhone = getPhoneParts(userInfo.phone)
    const name = userInfo.name
    updatePhone({
      name: name,
      internationalCode: fullPhone.internationalCode,
      localAreaCode: fullPhone.localAreaCode,
      number: fullPhone.number
    })
  }

  return userInfo
}

const hasPhoneNumber = (phone) => {
  if (!phone) {
    return false
  }
  const { internationalCode, localAreaCode, number } = phone
  return (
    internationalCode !== null &&
    localAreaCode !== null &&
    number !== null
  )
}

export {
  getUser,
  hasPhoneNumber
}

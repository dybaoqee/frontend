import { getUserInfo, getPhoneParts } from 'lib/user'

const getUser = async (id, updatePhone, updatePersonal) => {
  const userInfo = await getUserInfo(id)
  if (userInfo && !userInfo.error) {
    // Update user info in redux
    const fullPhoneNumber = getPhoneParts(userInfo.phone)
    updatePhone(fullPhoneNumber)
    updatePersonal({
      name: userInfo.name,
      email: userInfo.email
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

const isAuthenticated = (authenticated, userInfo) => {
  if (authenticated) {
    return true
  }

  if (userInfo && userInfo.phone) {
    return true
  }

  return false
}

const isNewUser = (userInfo) => {
  return userInfo.name !== null
}

export {
  isAuthenticated,
  isNewUser
}

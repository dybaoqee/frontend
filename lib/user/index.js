import * as Sentry from '@sentry/browser'
import get from 'lodash/get'
import { GET_USER_INFO } from 'graphql/user/queries'

const getUserInfo = async (id) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_INFO,
      variables: {
        id
      }
    })
    return data.userProfile
  } catch(e) {
    Sentry.captureException(e)
    return {
      result: null,
      error: 'Ocorreu um erro. Por favor, tente novamente.'
    }
  }
}

/**
 * Returns the user that is currently logged in or null if there is none.
 * Returns null on server.
 */
const getUser = () => {
  if (process.browser && window) {
    return get(window, '__NEXT_DATA__.props.initialProps.currentUser')
  }
  return null
}

const getPhoneParts = (phone) => {
  const internationalCode = phone.substr(0, 2)
  const localAreaCode = phone.substr(2, 2)
  const number = phone.substr(4, phone.length - 1)
  return {
    internationalCode,
    localAreaCode,
    number
  }
}

export {
  getUserInfo,
  getUser,
  getPhoneParts
}

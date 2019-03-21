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
  // Accounting for old international code data
  if (phone.startsWith('+55')) {
    phone = phone.replace('+55', '')
  } else if (phone.startsWith('55') && (phone.length === 13 || phone.length === 12)) {
    phone = phone.replace('55', '')
  }
  const localAreaCode = phone.substr(0, 2)
  const number = phone.substr(2, phone.length - 1)
  return {
    localAreaCode,
    number
  }
}

export {
  getUserInfo,
  getUser,
  getPhoneParts
}

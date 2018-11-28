import * as Sentry from '@sentry/browser'
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
  getPhoneParts
}

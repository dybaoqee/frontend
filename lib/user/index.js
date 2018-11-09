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
    return {
      result: null,
      error: 'Ocorreu um erro. Por favor, tente novamente.'
    }
  }
}

export {
  getUserInfo
}

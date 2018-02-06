import { post, put } from 'lib/request'

export const authenticate = async (email, password) => {
  try {
    const res = await post('/users/login', {
      user: {
        email,
        password
      }
    })
    return res.data
  } catch (error) {
    return error.response && error.response.status === 404
      ? "Wrong email/password"
      : "Unknown error. Please try again"
  }
}

export const confirmUser = async (token) => {
  try {
    const res = await put('/users/confirm', {
      user: {
        token
      }
    })
    return res.data
  } catch (error) {
    return error.response && error.response.status === 404
      ? "Wrong token"
      : "Unknown error. Please try again"
  }
}

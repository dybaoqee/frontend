import {post, put} from 'lib/request'

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
      ? 'Ocorreu um erro desconhecido. Por favor, tente novamente.'
      : 'E-mail ou senha inválidos.'
  }
}

export const resetPassword = async (email) => {
  try {
    const res = await post('/users/reset_password', {
      user: {
        email
      }
    })
    return res.data
  } catch (error) {
    throw error.response && error.response.status === 404
      ? 'Esse e-mail não está cadastrado.'
      : 'Ocorreu um erro desconhecido. Por favor, tente novamente.'
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
      ? 'Wrong token'
      : 'Unknown error. Please try again'
  }
}

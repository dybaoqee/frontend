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
    throw error.response && error.response.status === 404
      ? 'Ocorreu um erro desconhecido. Por favor, tente novamente.'
      : 'E-mail ou senha inválidos.'
  }
}

import { get, post, put } from '../lib/request'

export const getNeighborhoods = async () => {
  try {
    const response = await get('/neighborhoods')
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}


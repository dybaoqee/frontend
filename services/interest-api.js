import { post } from 'lib/request'

const buildPayload = (listingId, data) => {
  return {
    interest: {
      name: data.name,
      email: data.email,
      phone: data.phone
    }
  }
}

export const createInterest = async (listingId, data) => {
  const payload = buildPayload(listingId, data)

  try {
    return await post(`/listings/${listingId}/interests`, payload)
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}


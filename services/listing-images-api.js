import { get } from '../lib/request'

export const getListingImages = async (listingId, jwt) => {
  try {
    const response = await get(`/listings/${listingId}/images`, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}


import { get, put } from '../lib/request'

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

export const reorderImages = async (listingId, order, jwt) => {
  try {
    const response = await put(`/listings/${listingId}`, {'image_order': order}, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}


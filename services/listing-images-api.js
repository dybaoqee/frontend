import { get, post, put, del } from 'lib/request'

export const createImage = async (listingId, filename, jwt) => {
  const payload = {
    image: {
      filename: filename,
      position: 0
    }
  }

  try {
    const response = await post(`/listings/${listingId}/images`, payload, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

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
    const response = await put(`/listings/${listingId}/images_orders`, {'images': order}, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

export const deleteListingImage = async (listingId, imageId, jwt) => {
  try {
    const response = await del(`/listings/${listingId}/images/${imageId}`, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

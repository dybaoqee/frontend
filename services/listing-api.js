import { post, get } from '../lib/request'

export const createListing = async (data) => {
  try {
    const response = await post("listings", {
      listing: {
        area: data.area
      },
      address: {
        street: data.street
      }
    })
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? "Email is already taken."
      : "Unknown error. Please try again."
  }
}


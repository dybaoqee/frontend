import { post, get } from '../lib/request'

export const createListing = async (data, jwt) => {

  const payload = {
    listing: {
      'description': data.description,
      'price': data.price,
      'floor': data.floor,
      'rooms': data.rooms,
      'bathrooms': data.bathrooms,
      'area': data.area,
      'garage_spots': data.garageSpots,
      'score': data.score,
      'matterport_code': data.matterportCode
    },
    address: {
      'street': data.street,
      'street_number': data.streetNumber,
      'neighborhood': data.neighborhood,
      'city': data.city,
      'state': data.state,
      'postal_code': data.postalCode,
      'lat': data.lat,
      'lng': data.lng
    }
  }

  try {
    const response = await post("listings", payload, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : "Unknown error. Please try again."
  }
}


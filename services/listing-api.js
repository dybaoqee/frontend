import { get, post, put } from '../lib/request'

const buildPayload = (data) => {
  return {
    listing: {
      complement: data.complement,
      type: data.type,
      description: data.description,
      price: data.price,
      floor: data.floor,
      rooms: data.rooms,
      bathrooms: data.bathrooms,
      area: data.area,
      garage_spots: data.garageSpots,
      score: data.score,
      matterport_code: data.matterportCode
    },
    address: {
      street: data.street,
      street_number: data.streetNumber,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      lat: data.lat,
      lng: data.lng
    }
  }
}

const translatedKeys = {
  'bairro': 'neighborhood',
  'preco_maximo': 'max_price',
  'preco_minimo': 'min_price'
}

const buildQueryParams = function(query) {
  return Object.keys(query).map(function(key) {
    return translatedKeys[key] + '=' + query[key]
  }).join('&')
}

export const getListings = async (query) => {
  let endpoint = '/listings?'
  let params = buildQueryParams(query)

  try {
    return await get(endpoint + params)
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

export const getListing = async (id) => {
  try {
    const response = await get('/listings/' + id)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

export const createListing = async (data, jwt) => {
  const payload = buildPayload(data)
  try {
    const response = await post('/listings', payload, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

export const editListing = async (id, jwt) => {
  try {
    return get(`/listings/${id}/edit`, jwt)
  } catch (error) {
    return error.response
  }
}

export const updateListing = async (id, data, jwt) => {
  const payload = buildPayload(data)
  try {
    const response = await put(`/listings/${id}`, payload, jwt)
    return response
  } catch (error) {
    return error.response && error.response.status === 422
      ? error.response
      : 'Unknown error. Please try again.'
  }
}

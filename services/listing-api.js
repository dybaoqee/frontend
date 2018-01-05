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
  'bairro': 'neighborhoods',
  'area_minima': 'min_area',
  'area_maxima': 'max_area',
  'preco_maximo': 'max_price',
  'preco_minimo': 'min_price',
  'quartos': 'rooms'
}

// Transforms something like
// { bairro: 'Copacabana|Leblon', preco_maximo: '100000' }
// into
// { neighboorhood: ['Copacabana', 'Leblon'], max_price: '100000' }
const buildGetParams = function(query) {
  return Object.keys(query).reduce(function(previous, key) {
    previous[translatedKeys[key]] = splitParam(query[key])
    return previous
  }, {})
}

const splitParam = function(param) {
  const splitParam = param.split('|')
  return (splitParam.length > 1) ? splitParam : param
}

export const getListings = async (query) => {
  const endpoint = '/listings'
  const params = buildGetParams(query)

  try {
    return await get(endpoint, null, params)
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

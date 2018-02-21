import {get, post, put} from 'lib/request'

const buildPayload = data => {
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
  bairros: 'neighborhoods',
  area_minima: 'min_area',
  area_maxima: 'max_area',
  preco_maximo: 'max_price',
  preco_minimo: 'min_price',
  quartos: 'rooms'
}

// Transforms something like
// { bairros: 'Copacabana|Leblon', preco_maximo: '100000' }
// into
// { neighboorhood: ['Copacabana', 'Leblon'], max_price: '100000' }
const buildGetParams = function(query) {
  return Object.keys(query).reduce(function(previous, key) {
    previous[translatedKeys[key]] = splitParam(query[key], key)
    return previous
  }, {})
}

const splitParam = function(param, key) {
  if (key === 'bairros') {
    return param.split('|')
  }
  return param
}

export const getListings = async query => {
  const endpoint = '/listings'
  const params = buildGetParams(query)

  try {
    return await get(endpoint, null, params)
  } catch (error) {
    if (error.response && error.response.status === 422)
      throw new Error('Unknown error. Please try again.', error)
    else throw error
  }
}

export const getRelatedListings = async id => {
  const endpoint = `/listings/${id}/related`

  try {
    return await get(endpoint, null, {page_size: 4})
  } catch (error) {
    if (error.response && error.response.status === 422)
      throw new Error('Unknown error. Please try again.', error)
    else throw error
  }
}

export const getFeaturedListings = async () => {
  const endpoint = '/featured_listings'

  try {
    return await get(endpoint, null)
  } catch (error) {
    if (error.response && error.response.status === 422)
      throw new Error('Unknown error. Please try again.', error)
    else throw error
  }
}

export const getListing = async (id, jwt) => {
  try {
    const response = await get('/listings/' + id, jwt)
    return response
  } catch (error) {
    if (error.response && error.response.status === 422)
      throw new Error('Unknown error. Please try again.', error)
    else throw error
  }
}

export const createListing = async (data, jwt) => {
  const payload = buildPayload(data)
  try {
    const response = await post('/listings', payload, jwt)
    return response
  } catch (error) {
    if (error.response && error.response.status === 422)
      throw new Error('Unknown error. Please try again.', error)
    else throw error
  }
}

export const editListing = async (id, jwt) => {
  return get(`/listings/${id}/edit`, jwt)
}

export const updateListing = async (id, data, jwt) => {
  const payload = buildPayload(data)
  try {
    const response = await put(`/listings/${id}`, payload, jwt)
    return response
  } catch (error) {
    if (error.response && error.response.status === 422)
      throw new Error('Unknown error. Please try again.', error)
    else throw error
  }
}

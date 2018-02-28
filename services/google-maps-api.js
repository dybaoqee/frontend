/*  Usage:

    import MapsService, {operations} from 'services/google-maps-api'

    MapsService(operations.geocode, {
      address: '1600 Amphitheatre Parkway, Mountain View, CA'
    })
      .then((response) => console.log(response))
      .catch((err) => console.log('err'))
 */
const key = process.env.GOOGLE_MAPS_KEY
const googleMapsClient = require('@google/maps').createClient({
  key,
  language: 'pt-BR',
  Promise: Promise
})

const {geocode, places, placesAutoComplete} = googleMapsClient

/**
 * Execute a Google Maps API operation and return as a Promise.
 * @param {function} operation - The operation from Google Maps API.
 * @param {Object} query - The query object that will be sent.
 *
 */
export default function(operation, object) {
  return operation(object).asPromise()
}

export const operations = {
  geocode,
  places,
  placesAutoComplete
}

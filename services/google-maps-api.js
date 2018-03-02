/*  Server-side Google maps API

Usage:

    const MapsService = require('services/google-maps-api')

   const result = await MapsService.search(
          MapsService.placesAutoComplete,
          {
            input: 'Rua José Getúlio',
            language: 'pt-BR',
            components: {country: 'br'}
          }
        )
 */
const key = process.env.GOOGLE_MAPS_KEY
const googleMapsClient = require('@google/maps').createClient({
  key: key || 'AIzaSyDmYQLTPwsDPtErGWTgiejz17QCw39MEVQ',
  language: 'pt-BR',
  Promise: Promise
})

const {geocode, place, places, placesAutoComplete} = googleMapsClient

/**
 * Execute a Google Maps API operation and return as a Promise.
 * @param {function} operation - The operation from Google Maps API.
 * @param {Object} query - The query object that will be sent.
 *
 */
function MapService(operation, object) {
  return operation(object).asPromise()
}

function filterPropertyComponent(array, property) {
  return (
    array.filter((component) => component.types.includes(property))[0] || {}
  )
}

module.exports = {
  search: MapService,
  geocode,
  place,
  places,
  placesAutoComplete,
  filterPropertyComponent
}

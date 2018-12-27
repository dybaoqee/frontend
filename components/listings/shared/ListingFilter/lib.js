import numeral from 'numeral'
import {
  FILTERS
} from './constants'

function activeFilters(values) {
  const { types, price, neighborhoods, rooms, garageSpots, area } = values

  const propertyTypes = types && types.join(', ')

  const rangePrice = price && `R$${numeral(price.min).format('0.00a')} - R$${numeral(price.max).format('0.00a')}`

  const rangeArea = area && `${area.min} - ${area.max} m²`

  let rangeRooms = ''
  if (rooms && rooms.min !== null) {
    rangeRooms = `${rooms.min} quarto${rooms.min > 1 ? 's' : ''} ou mais`
  }

  let rangeGarageSpots = ''
  if (garageSpots && garageSpots.min !== null) {
    if (garageSpots.min === 0) {
      rangeGarageSpots = 'Sem vagas'
    } else {
      rangeGarageSpots = `${garageSpots.min} vaga${garageSpots.min > 1 ? 's' : ''} ou mais`
    }
  }

  const rangeNeighborhoods =
    neighborhoods &&
    neighborhoods.length > 0 &&
    `${neighborhoods[0].value}${
      neighborhoods.length > 1 ? ` e mais ${neighborhoods.length - 1}` : ''
    }`

  const filters = [
    {filter: FILTERS.TYPES.code, value: propertyTypes},
    {filter: FILTERS.NEIGHBORHOODS.code, value: rangeNeighborhoods},
    {filter: FILTERS.PRICE.code, value: rangePrice},
    {filter: FILTERS.ROOMS.code, value: rangeRooms},
    {filter: FILTERS.GARAGE_SPOTS.code, value: rangeGarageSpots},
    {filter: FILTERS.AREA.code, value: rangeArea}
  ].filter((filter) => filter.value)

  return filters.map(({filter, value}) => (
    {filter: filter, value: value}
  ))
}

export {
  activeFilters
}

import numeral from 'numeral'
import {
  FILTERS,
  MAX_GROUP_ITEMS_SELECTION
} from './constants'

function activeFilters(values) {
  const { types, price, neighborhoods, rooms, garageSpots, area } = values

  const propertyTypes = types && types.join(', ')
  const rangePrice =
    price &&
    `R$${numeral(price.min).format('0.00a')} - R$${numeral(price.max).format(
      '0.00a'
    )}`

  let rangeRooms = ''
  if (rooms && rooms.min !== null && rooms.max !== null) {
    rangeRooms = rooms.min === MAX_GROUP_ITEMS_SELECTION ? `${rooms.min} ou mais quartos` : `${rooms.min} quarto${rooms.min > 1 ? 's' : ''}`
  }

  let rangeGarageSpots = ''
  if (garageSpots && garageSpots.min !== null && garageSpots.max !== null) {
    if (garageSpots.min === 0) {
      rangeGarageSpots = 'Sem vagas'
    } else {
      rangeGarageSpots = garageSpots.min === MAX_GROUP_ITEMS_SELECTION ? `${garageSpots.min} ou mais vagas` : `${garageSpots.min} vaga${garageSpots.min > 1 ? 's' : ''}`
    }
  }

  const rangeArea = area && `${area.min} - ${area.max} m²`

  const rangeNeighborhoods =
    neighborhoods &&
    neighborhoods.length > 0 &&
    `${neighborhoods[0].value}${
      neighborhoods.length > 1 ? ` e mais ${neighborhoods.length - 1}` : ''
    }`

  const filters = [
    {filter: FILTERS.TYPES, value: propertyTypes},
    {filter: FILTERS.NEIGHBORHOODS, value: rangeNeighborhoods},
    {filter: FILTERS.PRICE, value: rangePrice},
    {filter: FILTERS.ROOMS, value: rangeRooms},
    {filter: FILTERS.GARAGE_SPOTS, value: rangeGarageSpots},
    {filter: FILTERS.AREA, value: rangeArea}
  ].filter((filter) => filter.value)

  return filters.map(({filter, value}) => (
    {filter: filter, value: value}
  ))
}

export {
  activeFilters
}

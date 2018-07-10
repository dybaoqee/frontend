import _ from 'lodash'

const filterValid = (object) => _.omit(object, [undefined])

function joinParam(param) {
  return param
    .map(function(item) {
      // If neighborhoods come from the url, such as if a filter has been applied
      // from the home page, the neighborhood name is passed simply as `item`.
      // If the neighborhood comes from the multiselect, the neighborhood name
      // is sent as `item.value`
      return item.value ? item.value : item
    })
    .join('|')
}

function treatMinPrice(price) {
  if (price && price.min) return `preco_minimo=${price.min}`
}

function treatMaxPrice(price) {
  if (price && price.max) return `preco_maximo=${price.max}`
}

function treatMinArea(area) {
  if (area && area.min) return `area_minima=${area.min}`
}

function treatMaxArea(area) {
  if (area && area.max) return `area_maxima=${area.max}`
}

function treatMinRooms(rooms) {
  if (rooms && rooms.min) return `quartos_minimo=${rooms.min}`
}

function treatMaxRooms(rooms) {
  if (rooms && rooms.max) return `quartos_maximo=${rooms.max}`
}

function treatMinGarageSpots(garageSpots) {
  if (garageSpots) return `vagas_minimo=${garageSpots.min}`
}

function treatMaxGarageSpots(garageSpots) {
  if (garageSpots) return `vagas_maximo=${garageSpots.max}`
}

function treatNeighborhoods(neighborhoods) {
  if (neighborhoods && neighborhoods.length > 0)
    return `bairros=${joinParam(neighborhoods)}`
}

function treatPropertyType(types) {
  if (types && types.length > 0) return `tipos=${joinParam(types)}`
}

export function treatParams({
  price,
  area,
  rooms,
  garageSpots,
  neighborhoods,
  types
}) {
  return [
    treatMinPrice(price),
    treatMaxPrice(price),
    treatMinArea(area),
    treatMaxArea(area),
    treatMinRooms(rooms),
    treatMaxRooms(rooms),
    treatMinGarageSpots(garageSpots),
    treatMaxGarageSpots(garageSpots),
    treatNeighborhoods(neighborhoods),
    treatPropertyType(types)
  ]
    .filter((n) => n)
    .join('&')
}

const splitParam = (param) => (param ? param.split('|') : [])

export const getFiltersForGraphQL = ({
  price,
  area,
  rooms,
  garageSpots,
  neighborhoods,
  types
}) =>
  filterValid({
    minPrice: price && price.min,
    maxPrice: price && price.max,
    minArea: area && area.min,
    maxArea: area && area.max,
    minRooms: rooms && rooms.min,
    maxRooms: rooms && rooms.max,
    minGarageSpots: garageSpots && garageSpots.min,
    maxGarageSpots: garageSpots && garageSpots.max,
    neighborhoods:
      neighborhoods &&
      neighborhoods.map(
        (neighborhood) =>
          neighborhood.value ? neighborhood.value : neighborhood
      ),
    types: types && types
  })

export const getDerivedParams = ({
  preco_minimo,
  preco_maximo,
  area_minima,
  area_maxima,
  vagas_minimo,
  vagas_maximo,
  quartos_minimo,
  quartos_maximo,
  bairros,
  tipos
}) => {
  return filterValid({
    [preco_minimo && preco_maximo ? 'price' : undefined]: {
      min: parseInt(preco_minimo),
      max: parseInt(preco_maximo)
    },
    [area_minima && area_maxima ? 'area' : undefined]: {
      min: parseInt(area_minima),
      max: parseInt(area_maxima)
    },
    [quartos_minimo && quartos_maximo ? 'rooms' : undefined]: {
      min: parseInt(quartos_minimo),
      max: parseInt(quartos_maximo)
    },
    [vagas_minimo && vagas_maximo ? 'garageSpots' : undefined]: {
      min: parseInt(vagas_minimo),
      max: parseInt(vagas_maximo)
    },
    [bairros && splitParam(bairros).length > 0
      ? 'neighborhoods'
      : undefined]: splitParam(bairros),
    [tipos && splitParam(tipos).length > 0 ? 'types' : undefined]: splitParam(
      tipos
    )
  })
}

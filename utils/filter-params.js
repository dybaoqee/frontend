import omit from 'lodash/omit'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

const filterValid = (object) => omit(object, [undefined])

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

export const getFiltersFromQuery = ({
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
  const filters = {
    minPrice: parseInt(preco_minimo),
    maxPrice: parseInt(preco_maximo),
    minArea: parseInt(area_minima),
    maxArea: parseInt(area_maxima),
    minRooms: parseInt(quartos_minimo),
    maxRooms: parseInt(quartos_maximo),
    minGarageSpots: parseInt(vagas_minimo),
    maxGarageSpots: parseInt(vagas_maximo),
    neighborhoods:
      bairros &&
      splitParam(bairros).map(
        (neighborhood) =>
          neighborhood.value ? neighborhood.value : neighborhood
      ),
    types:
      tipos && splitParam(tipos).map((type) => (type.value ? type.value : type))
  }

  return pickBy(filters, identity)
}

export const getNewFiltersFromQuery = ({
  preco_minimo,
  preco_maximo,
  area_minima,
  area_maxima,
  vagas_minimo,
  vagas_maximo,
  quartos_minimo,
  quartos_maximo,
  tipos
}, params) => {
  const price = preco_minimo || preco_maximo ? {
    min: parseInt(preco_minimo),
    max: parseInt(preco_maximo)
  } : null
  const area = area_minima || area_maxima ? {
    min: parseInt(area_minima),
    max: parseInt(area_maxima)
  } : null
  const rooms = quartos_minimo || quartos_maximo ? {
    min: parseInt(quartos_minimo),
    max: parseInt(quartos_maximo)
  } : null
  const garageSpots = vagas_minimo || vagas_maximo ? {
    min: parseInt(vagas_minimo),
    max: parseInt(vagas_maximo)
  } : null
  const types = tipos && splitParam(tipos).map((type) => (type.value ? type.value : type))
  const neighborhoodsSlugs = params && params.neighborhood ? [params.neighborhood] : null
  const citiesSlug = params && params.city ? [params.city] : null
  const filters = {
    price,
    area,
    rooms,
    garageSpots,
    types,
    neighborhoodsSlugs,
    citiesSlug
  }

  return pickBy(filters, identity)
}

export const getFiltersFromFilters = ({
  price,
  area,
  garageSpots,
  rooms,
  neighborhoods,
  types
}) => {
  const filters = {
    minPrice: price && parseInt(price.min),
    maxPrice: price && parseInt(price.max),
    minArea: area && parseInt(area.min),
    maxArea: area && parseInt(area.max),
    minRooms: rooms && parseInt(rooms.min),
    maxRooms: rooms && parseInt(rooms.max),
    minGarageSpots: garageSpots && parseInt(garageSpots.min),
    maxGarageSpots: garageSpots && parseInt(garageSpots.max),
    neighborhoods:
      neighborhoods &&
      neighborhoods.length > 0 &&
      neighborhoods.map(
        (neighborhood) =>
          neighborhood.value ? neighborhood.value : neighborhood
      ),
    types:
      types &&
      types.length > 0 &&
      types.map((type) => (type.value ? type.value : type))
  }

  return pickBy(filters, identity)
}

export const getNewFiltersFromFilters = ({
  price,
  area,
  garageSpots,
  rooms,
  neighborhoodsSlugs,
  citiesSlug,
  types
}) => {
  const filters = {
    minPrice: price && parseInt(price.min),
    maxPrice: price && parseInt(price.max),
    minArea: area && parseInt(area.min),
    maxArea: area && parseInt(area.max),
    minRooms: rooms && parseInt(rooms.min),
    maxRooms: rooms && parseInt(rooms.max),
    minGarageSpots: garageSpots && parseInt(garageSpots.min),
    maxGarageSpots: garageSpots && parseInt(garageSpots.max),
    neighborhoodsSlugs,
    citiesSlug,
    types:
      types &&
      types.length > 0 &&
      types.map((type) => (type.value ? type.value : type))
  }

  return pickBy(filters, identity)
}

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

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

function treatMinPrice(params) {
  if (params.price.min) {
    return `preco_minimo=${params.price.min}`
  }
}

function treatMaxPrice(params) {
  if (params.price.max) {
    return `preco_maximo=${params.price.max}`
  }
}

function treatMinArea(params) {
  if (params.area.min) {
    return `area_minima=${params.area.min}`
  }
}

function treatMaxArea(params) {
  if (params.area.max) {
    return `area_maxima=${params.area.max}`
  }
}

function treatMinRooms(params) {
  if (params.rooms.min) {
    return `quartos_minimo=${params.rooms.min}`
  }
}

function treatMaxRooms(params) {
  if (params.rooms.max) {
    return `quartos_maximo=${params.rooms.max}`
  }
}

function treatMinGarageSpots(params) {
  if (params.garageSpots.min) {
    return `vagas_minimo=${params.garageSpots.min}`
  }
}

function treatMaxGarageSpots(params) {
  if (params.garageSpots.max) {
    return `vagas_maximo=${params.garageSpots.max}`
  }
}

function treatNeighborhoods(params) {
  if (params.neighborhoods.length > 0) {
    return `bairros=${joinParam(params.neighborhoods)}`
  }
}

export function treatParams(params) {
  return [
    treatMinPrice(params),
    treatMaxPrice(params),
    treatMinArea(params),
    treatMaxArea(params),
    treatMinRooms(params),
    treatMaxRooms(params),
    treatMinGarageSpots(params),
    treatMaxGarageSpots(params),
    treatNeighborhoods(params)
  ]
    .filter((n) => n)
    .join('&')
}

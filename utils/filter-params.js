function joinParam(param) {
  return param.map(function(item) {
    return item.value;
  }).join('|')
}

function treatMinPrice(params) {
  if(params.price.min) {
    return `preco_minimo=${params.price.min}`
  }
}

function treatMaxPrice(params) {
  if(params.price.max) {
    return `preco_maximo=${params.price.max}`
  }
}

function treatMinArea(params) {
  if(params.area.min) {
    return `area_minima=${params.area.min}`
  }
}

function treatMaxArea(params) {
  if(params.area.max) {
    return `area_maxima=${params.area.max}`
  }
}

function treatRooms(params) {
  if(params.rooms.value) {
    return `quartos=${params.rooms.value}`
  }
}

function treatNeighborhoods(params) {
  if(params.neighborhoods.value.length > 0) {
    return `bairros=${joinParam(params.neighborhoods.value)}`
  }
}

export function treatParams(params) {
  return [
    treatMinPrice(params),
    treatMaxPrice(params),
    treatMinArea(params),
    treatMaxArea(params),
    treatRooms(params),
    treatNeighborhoods(params)
  ].filter(n => n).join('&')
}

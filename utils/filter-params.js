function joinParam(param) {
  if (Array.isArray(param)) {
    return param.map(function(item) {
      return item.value;
    }).join('|')
  } else {
    return param
  }
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

export function treatParams(params) {
  return [
    treatMinPrice(params),
    treatMaxPrice(params),
    treatMinArea(params),
    treatMaxArea(params),
    treatRooms(params)
  ].filter(n => n).join('&')
}

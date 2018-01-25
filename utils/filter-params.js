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

export function treatParams(params) {
  return [
    treatMinPrice(params),
    treatMaxPrice(params),
}

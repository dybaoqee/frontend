const AREA_FILTER = {
  MIN: 35,
  MAX: 500
}

const PRICE_FILTER = {
  MIN: 250000,
  MAX: 12000000
}

const FILTERS = {
  TYPES: {
    code: 'types',
    label: 'Tipos de imóveis'
  },
  AREA: {
    code: 'area',
    label: 'Área'
  },
  PRICE: {
    code: 'price',
    label: 'Preço'
  },
  ROOMS: {
    code: 'rooms',
    label: 'Quartos'
  },
  GARAGE_SPOTS: {
    code: 'garageSpots',
    label: 'Vagas de garagem'
  },
  NEIGHBORHOODS: {
    code: 'neighborhoods',
    label: 'Bairros'
  }
}

export {
  FILTERS,
  AREA_FILTER,
  PRICE_FILTER
}
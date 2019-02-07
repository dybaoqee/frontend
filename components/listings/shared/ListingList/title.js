const BUY_TITLE_BASE = 'Apartamentos e Casas à venda'
const BUY_TITLE_DEFAULT_END = 'na Zona Sul do Rio de Janeiro e em Perdizes, São Paulo.'
const BUY_TITLE_FILTER_PREPOSITION = 'em'
const BUY_TITLE_NEIGHBORHOOD_PREPOSITION = 'em'
const BUY_TITLE_CITY_PREPOSITION = 'em'
const BUY_TITLE_STATE_PREPOSITION = 'no'

const STATES = [
  {
    state: 'rj',
    city: null,
    neighborhood: null,
    stateValue: 'Rio de Janeiro',
    cityValue: null,
    neighborhoodValue: null
  },
  {
    state: 'sp',
    city: null,
    neighborhood: null,
    stateValue: 'São Paulo',
    cityValue: null,
    neighborhoodValue: null
  },
]

const CITIES = [
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: null,
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: null
  },
  {
    state: 'sp',
    city: 'sao-paulo',
    neighborhood: null,
    stateValue: 'SP',
    cityValue: 'São Paulo',
    neighborhoodValue: null
  },
]

const NEIGHBORHOODS = [
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'humaita',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Humaitá'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'copacabana',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Copacabana'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'botafogo',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Botafogo'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'catete',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Catete'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'cosme-velho',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Cosme Velho'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'flamengo',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Flamengo'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'gavea',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Gávea'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'ipanema',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Ipanema'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'itanhanga',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Itanhangá'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'jardim-botanico',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Jardim Botânico'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'joa',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Joá'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'lagoa',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Lagoa'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'laranjeiras',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Laranjeiras'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'leblon',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Leblon'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'leme',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Leme'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'sao-conrado',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'São Conrado'
  },
  {
    state: 'rj',
    city: 'rio-de-janeiro',
    neighborhood: 'urca',
    stateValue: 'RJ',
    cityValue: 'Rio de Janeiro',
    neighborhoodValue: 'Urca'
  },
  {
    state: 'sp',
    city: 'sao-paulo',
    neighborhood: 'perdizes',
    stateValue: 'SP',
    cityValue: 'São Paulo',
    neighborhoodValue: 'Perdizes'
  },
]

const CUSTOM_BUY_TITLE = [
  {
    city: 'rio-de-janeiro',
    value: 'na Zona Sul do Rio de Janeiro'
  },
  {
    state: 'sp',
    value: 'em São Paulo'
  }
]

function getTitleTextByFilters(neighborhoodsSlugs) {
  let h1Content = `${BUY_TITLE_BASE}`
  if (neighborhoodsSlugs.length > 1) {
    h1Content += ` ${BUY_TITLE_DEFAULT_END}`
  } else {
    const {stateValue, cityValue, neighborhoodValue} = NEIGHBORHOODS.find(value => value.neighborhood === neighborhoodsSlugs[0])
    h1Content += ` ${BUY_TITLE_NEIGHBORHOOD_PREPOSITION} ${neighborhoodValue}, ${cityValue} - ${stateValue}`
  }
  return `${h1Content}`
}

function getTitleTextByParams(params) {
  let h1Content = `${BUY_TITLE_BASE}`
  const {state, city, neighborhood} = params

  if (neighborhood) {
    const custom = CUSTOM_BUY_TITLE.find(title => title.neighborhood === neighborhood)
    const {stateValue, cityValue, neighborhoodValue} = NEIGHBORHOODS.find(value => value.neighborhood === neighborhood)
    h1Content += custom ? ` ${custom.value}` : ` ${BUY_TITLE_NEIGHBORHOOD_PREPOSITION} ${neighborhoodValue}, ${cityValue} - ${stateValue}`
  } else if (city) {
    const custom = CUSTOM_BUY_TITLE.find(title => title.city === city)
    const {stateValue, cityValue} = CITIES.find(value => value.city === city)
    h1Content += custom ? ` ${custom.value}` : ` ${BUY_TITLE_CITY_PREPOSITION} ${cityValue} - ${stateValue}`
  } else if(state) {
    const custom = CUSTOM_BUY_TITLE.find(title => title.state === state)
    const {stateValue} = STATES.find(value => value.state === state)
    h1Content += custom ? ` ${custom.value}` : ` ${BUY_TITLE_STATE_PREPOSITION} ${stateValue}`
  } else {
    h1Content += ` ${BUY_TITLE_DEFAULT_END}`
  }

  return h1Content
}

export {
  BUY_TITLE_BASE,
  BUY_TITLE_DEFAULT_END,
  BUY_TITLE_FILTER_PREPOSITION,
  BUY_TITLE_NEIGHBORHOOD_PREPOSITION,
  BUY_TITLE_CITY_PREPOSITION,
  BUY_TITLE_STATE_PREPOSITION,
  NEIGHBORHOODS,
  CITIES,
  STATES,
  CUSTOM_BUY_TITLE,
  getTitleTextByFilters,
  getTitleTextByParams
}

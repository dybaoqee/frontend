import {
  BUY_TITLE_BASE,
  BUY_TITLE_DEFAULT_END,
  BUY_TITLE_FILTER_PREPOSITION,
  BUY_TITLE_NEIGHBORHOOD_PREPOSITION,
  BUY_TITLE_CITY_PREPOSITION,
  BUY_TITLE_STATE_PREPOSITION,
  CUSTOM_BUY_TITLE
} from 'constants/listing-locations'

function getStateTitle(stateSlug, districts) {
  const custom = CUSTOM_BUY_TITLE.find(a => a.stateSlug === stateSlug)
  const location = districts.find(b => b.stateSlug === stateSlug)
  const stateTitle = location ? ` ${BUY_TITLE_STATE_PREPOSITION} ${location.state}` : ` ${stateSlug} ${districts[0].stateSlug}`

  return custom ? ` ${custom.value}` : stateTitle
}

function getCityTitle(citySlug, districts) {
  const custom = CUSTOM_BUY_TITLE.find(a => a.citySlug === citySlug)
  const location = districts.find(a => a.citySlug === citySlug)
  const cityTitle = location ? ` ${BUY_TITLE_CITY_PREPOSITION} ${location.city} - ${location.state}` : ` ${BUY_TITLE_DEFAULT_END}`

  return custom ? ` ${custom.value}` : cityTitle
}

function getNeighborhoodTitle(neighborhoodSlug, districts) {
  const custom = CUSTOM_BUY_TITLE.find(a => a.nameSlug === neighborhoodSlug)
  const info = districts.find(a => a.nameSlug === neighborhoodSlug)
  let neighborhoodTitle = info ? ` ${BUY_TITLE_NEIGHBORHOOD_PREPOSITION} ${info.name}, ${info.city} - ${info.state}` : ` ${BUY_TITLE_DEFAULT_END}`

  return custom ? ` ${custom.value}` : neighborhoodTitle
}

function getTitleTextByFilters(neighborhoodsSlugs, districts) {
  let h1Content = `${BUY_TITLE_BASE}`
  if (neighborhoodsSlugs.length === 1) {
    h1Content += getNeighborhoodTitle(neighborhoodsSlugs[0], districts)
  } else {
    h1Content += ` ${BUY_TITLE_DEFAULT_END}`
  }
  return `${h1Content}`
}

function getTitleTextByParams(params, districts) {
  let h1Content = `${BUY_TITLE_BASE}`
  const {state, city, neighborhood} = params

  if (neighborhood) {
    h1Content += getNeighborhoodTitle(neighborhood, districts)
  } else if (city) {
    h1Content += getCityTitle(city, districts)
  } else if(state) {
    h1Content += getStateTitle(state, districts)
  } else {
    h1Content += ` ${BUY_TITLE_DEFAULT_END}`
  }

  return h1Content
}

export {
  getTitleTextByFilters,
  getTitleTextByParams
}

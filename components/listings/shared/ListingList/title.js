import {
  BUY_TITLE_BASE,
  BUY_TITLE_DEFAULT_END,
  BUY_TITLE_FILTER_PREPOSITION,
  BUY_TITLE_NEIGHBORHOOD_PREPOSITION,
  BUY_TITLE_CITY_PREPOSITION,
  BUY_TITLE_STATE_PREPOSITION,
  NEIGHBORHOODS,
  CITIES,
  STATES,
  CUSTOM_BUY_TITLE
} from 'constants/listing-locations'

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
  getTitleTextByFilters,
  getTitleTextByParams
}

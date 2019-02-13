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

function getStateTitle(state) {
  const custom = CUSTOM_BUY_TITLE.find(a => a.state === state)
  const infos = STATES.find(a => a.state === state)
  const stateTitle = infos ? ` ${BUY_TITLE_STATE_PREPOSITION} ${infos.stateValue}` : ` ${BUY_TITLE_DEFAULT_END}`

  return custom ? ` ${custom.value}` : stateTitle
}

function getCityTitle(city) {
  const custom = CUSTOM_BUY_TITLE.find(a => a.city === city)
  const info = CITIES.find(a => a.city === city)
  const cityTitle = info ? ` ${BUY_TITLE_CITY_PREPOSITION} ${info.cityValue} - ${info.stateValue}` : ` ${BUY_TITLE_DEFAULT_END}`

  return custom ? ` ${custom.value}` : cityTitle
}

function getNeighborhoodTitle(neighborhood) {
  const custom = CUSTOM_BUY_TITLE.find(a => a.neighborhood === neighborhood)
  const info = NEIGHBORHOODS.find(a => a.neighborhood === neighborhood)
  let neighborhoodTitle = info ? ` ${BUY_TITLE_NEIGHBORHOOD_PREPOSITION} ${info.neighborhoodValue}, ${info.cityValue} - ${info.stateValue}` : ` ${BUY_TITLE_DEFAULT_END}`

  return custom ? ` ${custom.value}` : neighborhoodTitle
}

function getTitleTextByFilters(neighborhoodsSlugs) {
  let h1Content = `${BUY_TITLE_BASE}`
  if (neighborhoodsSlugs.length > 1) {
    const neighborhoodsFilter = NEIGHBORHOODS.reduce((a, b) => {
      if (neighborhoodsSlugs.indexOf(b.neighborhood) > -1) {
        a.push(b)
      }
      return a
    }, [])

    const sameState = neighborhoodsFilter.reduce((a, b) => a.state === b.state ? a : false)

    if (sameState) {
      const sameCity = neighborhoodsFilter.reduce((a, b) => a.city === b.city ? a : false)
      if (sameCity) {
        h1Content += getCityTitle(neighborhoodsFilter[0].city)
      } else {
        h1Content += getStateTitle(neighborhoodsFilter[0].state)
      }
    } else {
      h1Content += ` ${BUY_TITLE_DEFAULT_END}`
    }
  } else {
    h1Content += getNeighborhoodTitle(neighborhoodsSlugs[0])
  }
  return `${h1Content}`
}

function getTitleTextByParams(params) {
  let h1Content = `${BUY_TITLE_BASE}`
  const {state, city, neighborhood} = params

  if (neighborhood) {
    h1Content += getNeighborhoodTitle(neighborhood)
  } else if (city) {
    h1Content += getCityTitle(city)
  } else if(state) {
    h1Content += getStateTitle(state)
  } else {
    h1Content += ` ${BUY_TITLE_DEFAULT_END}`
  }

  return h1Content
}

export {
  getTitleTextByFilters,
  getTitleTextByParams
}

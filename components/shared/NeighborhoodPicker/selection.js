import difference from 'lodash/difference'
import { clone } from 'utils/clone'

function updateSelection(selected, neighborhood) {
  let selectedNeighborhoods = clone(selected)
  if (selectedNeighborhoods.includes(neighborhood)) {
    selectedNeighborhoods = selectedNeighborhoods.filter((slug) => slug !== neighborhood)
  } else {
    selectedNeighborhoods.push(neighborhood)
  }
  return selectedNeighborhoods
}

function selectCity(cities, selected, citySlug) {
  cities.forEach((city) => {
    if (city.slug === citySlug) {
      return getNeighborhoodsSlugs(cities.neighborhoods)
    }
  })
}

function isNeighborhoodSelected(selected, neighborhood) {
  return selected.includes(neighborhood)
}

function isCitySelected(cities, selected, citySlug) {
  let included = false
  selected.sort()
  cities.forEach((city) => {
    if (city.citySlug === citySlug) {
      let neighborhoodSlugs = getNeighborhoodsSlugs(city.neighborhoods)
      included = difference(neighborhoodSlugs, selected).length === 0
    }
  })
  return included
}

function getNeighborhoodsSlugs(neighborhoods) {
  return neighborhoods.map((neighborhood) => {
    return neighborhood.nameSlug
  })
}

export {
  updateSelection,
  isNeighborhoodSelected,
  isCitySelected,
  selectCity
}

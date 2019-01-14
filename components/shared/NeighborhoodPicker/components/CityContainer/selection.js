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

export {
  updateSelection
}

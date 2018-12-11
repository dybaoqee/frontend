const slugify = require('slug')

const parseSlug = (params) => {
  const paramsWithId = {...params}
  const parameterToSplit = params.listingId
    ? params.listingId
    : params.streetwithId
  paramsWithId.id = parseInt(parameterToSplit.split('-').pop())
  return paramsWithId
}

const buildSlug = (listing) => {
  const {city, state, neighborhood, street} = listing.address
  const {id} = listing
  const urlSchema = [state, city, neighborhood, street, `id-${id}`]
  const slug =
    '/imoveis/' +
    urlSchema.map((component) => formatComponent(component)).join('/')
  return slug
}

const formatComponent = (component) => slugify(component).toLowerCase()

const getListingsCoordinates = (listings) =>
  listings.map(({id, price, address: {lat, lng}}) => ({
    id,
    price,
    address: {lat, lng}
  }))

const filterListings = (listings = [], filters) => {
  const {
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    minRooms,
    maxRooms,
    minGarageSpots,
    maxGarageSpots,
    neighborhoods,
    types
  } = filters
  return listings.filter(
    ({
      price: lPrice,
      rooms: lRooms,
      area: lArea,
      garageSpots: lGarageSpots,
      type: lType,
      address: {neighborhood: lNeighborhood}
    }) => {
      let returnListing = true
      if (minPrice && lPrice < parseInt(minPrice)) returnListing = false

      if (maxPrice && lPrice > parseInt(maxPrice)) returnListing = false

      if (minArea && lArea < parseInt(minArea)) returnListing = false
      if (maxArea && lArea > parseInt(maxArea)) returnListing = false

      if (minRooms && lRooms < parseInt(minRooms)) returnListing = false
      if (maxRooms && lRooms > parseInt(maxRooms)) returnListing = false

      if (minGarageSpots && lGarageSpots < parseInt(minGarageSpots))
        returnListing = false
      if (maxGarageSpots && lGarageSpots > parseInt(maxGarageSpots))
        returnListing = false

      if (neighborhoods && neighborhoods.indexOf(lNeighborhood) === -1)
        returnListing = false

      if (types && types.indexOf(lType) === -1) returnListing = false

      return returnListing
    }
  )
}

const getListingId = (url) => {
  let [, id] = url.match(/id-(\d+)/) || url.match(/(\d+)/)
  return id
}

const getListingSummary = (listing) => {
  const { area, garage_spots, rooms } = listing
  const listingSummary = `${area}m² - ${rooms} quarto${plural(rooms)}${garage_spots ? ` - ${garage_spots} vaga${plural(garage_spots)}` : ``}`
  return listingSummary
}

const plural = (item) => {
  return item > 1 ? 's' : ''
}

module.exports = {
  buildSlug,
  parseSlug,
  getListingsCoordinates,
  filterListings,
  getListingId,
  getListingSummary,
  plural
}

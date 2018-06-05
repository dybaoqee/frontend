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
  const urlSchema = [state, city, neighborhood, `id-${id}`, street]
  const slug =
    '/imoveis/' +
    urlSchema.map((component) => formatComponent(component)).join('/')
  return slug
}

const formatComponent = (component) => slugify(component).toLowerCase()

module.exports = {
  buildSlug,
  parseSlug
}

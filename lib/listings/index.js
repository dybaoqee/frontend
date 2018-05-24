const slugify = require('slug')
const parseSlug = (params) => {
  const paramsWithId = {...params}
  paramsWithId.id = parseInt(params.streetwithId.split('-').pop())
  return paramsWithId
}

const buildSlug = (listing) => {
  const {city, state, neighborhood, street} = listing.address
  const {id} = listing
  const urlSchema = [state, city, neighborhood, street]
  const slug =
    '/imoveis/' +
    urlSchema.map((component) => formatComponent(component)).join('/') +
    `-${id}`
  return slug
}

const formatComponent = (component) => slugify(component).toLowerCase()

module.exports = {
  buildSlug,
  parseSlug
}

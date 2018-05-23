export const parseSlug = (params) => {
  const paramsWithId = {...params}
  paramsWithId.id = parseInt(params.streetwithId.split('-').pop())
  return paramsWithId
}

export const buildSlug = (listing) => {
  const {city, state, neighborhood, street} = listing.address
  const {id} = listing
  const zone = 'zona-sul'
  const urlSchema = [state, city, zone, neighborhood, street]
  const slug =
    '/imoveis/' +
    urlSchema.map((component) => formatComponent(component)).join('/') +
    `-${id}`
  return slug
}

const formatComponent = (component) =>
  component
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split(' ')
    .join('-')

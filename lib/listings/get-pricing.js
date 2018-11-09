/**
 * Returns the approximate listing price.
 */
const getPricing = () => {

}

const getPricingInput = (addressInput, homeDetails, rooms, garage, name, email) => {
  const area = parseInt(homeDetails.area)
  const { bathrooms, bedrooms } = rooms
  const { spots } = garage
  const isCovered = true

  return {
    address: addressInput,
    area,
    bathrooms,
    rooms: bedrooms,
    name,
    email,
    garageSpots: spots,
    isCovered
  }
}

export {
  getPricing,
  getPricingInput
}

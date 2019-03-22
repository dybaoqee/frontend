import { getAddressInput } from 'lib/address'

const BRAZIL_CODE = '+55'

export function getListingInput({location, homeDetails, rooms, phone, pricing}) {
  const { addressData, complement } = location
  const { area, floor, type, maintenanceFee } = homeDetails
  const { bathrooms, bedrooms, suites, spots } = rooms
  const { userPrice } = pricing
  const { localAreaCode, number } = phone

  const address = getAddressInput(addressData)
  return {
    address,
    area: parseInt(area),
    bathrooms,
    complement,
    floor,
    garageSpots: spots,
    maintenanceFee: parseInt(maintenanceFee),
    phone: `${BRAZIL_CODE}${localAreaCode}${number}`,
    price: userPrice,
    rooms: bedrooms,
    suites,
    type
  }
}

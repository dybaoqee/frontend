import { getPricingInput } from 'lib/listings/get-pricing'

describe('pricing functions', () => {
  it('should create the correct input for the pricing query', () => {
    const addressInput = {}
    const homeDetails = {area: 100}
    const homeRooms = {bathrooms: 2, bedrooms: 3}
    const garage = {spots: 1}
    const userName = 'name'
    const userEmail = 'email@email.com'

    const pricingInput = getPricingInput(addressInput, homeDetails, homeRooms, garage, userName, userEmail)
    const { address, area, bathrooms, rooms, name, email, garageSpots, isCovered } = pricingInput

    expect(address).toEqual({})
    expect(area).toBe(100)
    expect(bathrooms).toBe(2)
    expect(rooms).toBe(3)
    expect(garageSpots).toBe(1)
    expect(name).toBe('name')
    expect(email).toBe('email@email.com')
    expect(isCovered).toBe(true)
  })
})

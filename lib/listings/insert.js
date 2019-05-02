export function getSellerLeadInput({location, homeDetails, rooms, pricing}) {
  const {complement} = location
  const {type, maintenanceFee} = homeDetails
  const {suites} = rooms
  const {userPrice} = pricing

  return {
    complement,
    maintenanceFee: parseInt(maintenanceFee),
    price: userPrice,
    suites,
    type
  }
}

import { ESTIMATE_PRICE } from 'graphql/listings/mutations'

const USER_PRICE_MULTIPLIER = 1.1

/**
 * Returns the approximate listing price.
 */
const estimatePrice = async (apolloClient, pricingInput) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ESTIMATE_PRICE,
      variables: pricingInput
    })

    if (data && data.requestPriceSuggestion) {
      const { suggestedPrice } = data.requestPriceSuggestion
      return {
        result: {
          suggestedPrice: parseInt(suggestedPrice),
          userPrice: parseInt(suggestedPrice * USER_PRICE_MULTIPLIER)
        },
        error: null
      }
    }
  } catch (e) {
    return {
      result: null,
      error: 'Ocorreu um erro. Por favor, tente novamente.'
    }
  }
}

/**
 * Creates the input object for the estimatePrice query.
 */
const getPricingInput = (addressInput, homeDetails, rooms, garage, personal, userInfo) => {
  const area = parseInt(homeDetails.area)
  const { bathrooms, bedrooms } = rooms
  let name, email
  if (personal && personal.name !== null) {
    name = personal.name
    email = personal.email
  } else {
    name = userInfo.name
    email = userInfo.email
  }
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
  estimatePrice,
  getPricingInput
}

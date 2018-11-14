import { ESTIMATE_PRICE } from 'graphql/listings/mutations'

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
        result: suggestedPrice,
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
const getPricingInput = (addressInput, homeDetails, rooms, garage, personal) => {
  const area = parseInt(homeDetails.area)
  const { bathrooms, bedrooms } = rooms
  const { name, email } = personal
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

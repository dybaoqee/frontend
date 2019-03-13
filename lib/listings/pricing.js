import * as Sentry from '@sentry/browser'
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
        result: {
          suggestedPrice: parseInt(suggestedPrice)
        },
        error: null
      }
    }
  } catch (e) {
    Sentry.captureException(e)
    return {
      result: null,
      error: 'Ocorreu um erro. Por favor, tente novamente.'
    }
  }
}

/**
 * Creates the input object for the estimatePrice query.
 */
const getPricingInput = (addressInput, homeDetails, rooms, personal, userInfo) => {
  const area = parseInt(homeDetails.area)
  const { bathrooms, bedrooms, spots } = rooms
  let name, email

  if (personal && personal.name !== null) {
    name = personal.name
    email = personal.email
  } else if (userInfo && userInfo.name !== null) {
    name = userInfo.name
    email = userInfo.email
  }

  return {
    address: addressInput,
    area,
    bathrooms,
    rooms: bedrooms,
    name: name || null,
    email: email || null,
    garageSpots: spots,
    isCovered: true
  }
}

export {
  estimatePrice,
  getPricingInput
}

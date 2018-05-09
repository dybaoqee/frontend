import gql from 'graphql-tag'

export const GET_FAVORITE_LISTINGS_IDS = gql`
  {
    favoritedListings {
      id
    }
  }
`

export const GET_FAVORITE_LISTINGS = gql`
  {
    favoritedListings {
      id
      price
      matterportCode
      area
      isActive
      bathrooms
      garageSpots
      hasElevator
      propertyTax
      maintenanceFee
      description
      floor
      rooms
      images {
        filename
      }
      address {
        city
        lat
        lng
        neighborhood
        postalCode
        state
        street
        streetNumber
      }
    }
  }
`

export const GET_USER_INFO = gql`
  query userProfile($id: ID!) {
    userProfile(id: $id) {
      id
      name
      email
      phone
    }
  }
`

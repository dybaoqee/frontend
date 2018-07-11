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
      area
      rooms
      floor
      garageSpots
      area
      bathrooms
      price
      type
      description
      images(limit: 1) {
        filename
      }
      address {
        street
        neighborhood
        state
        city
        lat
        lng
      }
    }
  }
`

export const GET_FAVORITE_LISTINGS_COORDINATES = gql`
  {
    favoritedListings {
      id
      price
      address {
        lat
        lng
      }
    }
  }
`

export const GET_USER_LISTINGS = gql`
  {
    userListings {
      id
      price
      matterportCode
      area
      isActive
      bathrooms
      garageSpots
      hasElevator
      propertyTax
      type
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
      role
      notificationPreferences {
        email
      }
    }
  }
`

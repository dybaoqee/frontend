import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
  query listings($filters: ListingFilter, $pagination: ListingPagination) {
    listings(filters: $filters, pagination: $pagination) {
      remainingCount
      listings {
        id
        area
        rooms
        floor
        garageSpots
        area
        bathrooms
        price
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
  }
`

export const GET_LISTINGS_COORDINATES = gql`
  query listings {
    listings {
      listings {
        id
        price
        address {
          lat
          lng
        }
      }
    }
  }
`

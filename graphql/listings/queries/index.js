import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
  query listings($filters: ListingFilter, $pagination: ListingPagination) {
    listings(filters: $filters, pagination: $pagination)
      @connection(key: "listingsFetched") {
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

export const GET_LISTING = gql`
  query listing($id: ID!) {
    listing(id: $id) {
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
`

export const GET_LISTINGS_COORDINATES = gql`
  query listings_coordinates($filters: ListingFilter) {
    listings(filters: $filters) {
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

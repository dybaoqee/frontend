import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
  query listings($filters: ListingFilterInput, $pagination: ListingPagination) {
    listings(filters: $filters, pagination: $pagination)
      @connection(key: "listingsFetched", filter: ["filters"]) {
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
        images(limit: 1, isActive: true) {
          filename
          position
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
      images(limit: 1, isActive: true) {
        filename
        position
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

export const GET_FULL_LISTING = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      id
      address {
        city
        citySlug
        lat
        lng
        neighborhood
        neighborhoodSlug
        postalCode
        state
        stateSlug
        street
        streetNumber
        streetSlug
      }
      area
      balconies
      bathrooms
      complement
      dependencies
      description
      insertedAt
      floor
      garageSpots
      hasElevator
      images(isActive: true) {
        id
        filename
      }
      isActive
      maintenanceFee
      matterportCode
      owner {
        id
      }
      price
      propertyTax
      restrooms
      rooms
      type
      suggestedPrice
    }
  }
`

export const GET_LISTING_STATS = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      inPersonVisitCount
      interestCount
      listingFavoriteCount
      listingVisualisationCount
      tourVisualisationCount
    }
  }
`

export const GET_LISTINGS_COORDINATES = gql`
  query listings_coordinates($filters: ListingFilterInput) {
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

export const GET_FEATURED_LISTINGS = gql`
  {
    featuredListings {
      id
      price
      address {
        street
        neighborhood
        city
        state
      }
      images(limit: 1, isActive: true) {
        filename
      }
    }
  }
`

export const GET_NEIGHBORHOODS = gql`
  {
    neighborhoods
  }
`

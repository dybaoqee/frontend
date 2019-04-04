import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
  query listings($filters: ListingFilterInput, $pagination: ListingPagination) {
    listings(filters: $filters, pagination: $pagination)
      @connection(key: "listingsFetched", filter: ["filters"]) {
      remainingCount
      listings {
        id
        area
        floor
        price
        rooms
        suites
        bathrooms
        garageSpots
        description
        development {
          uuid
          name
        }
        units {
          uuid
          area
          floor
          price
          rooms
          suites
          bathrooms
          garageSpots
        }
        images(limit: 5, isActive: true) {
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
          postalCode
        }
        type
      }
    }
  }
`

export const GET_LISTING = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      id
      area
      floor
      price
      rooms
      suites
      bathrooms
      garageSpots
      description
      development {
        uuid
        name
      }
      units {
        uuid
        area
        floor
        price
        rooms
        suites
        bathrooms
        garageSpots
      }
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
        postalCode
      }
      type
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
      insertedAt
      hasElevator
      type
      area
      floor
      complement
      price
      propertyTax
      maintenanceFee
      suggestedPrice
      isActive
      rooms
      suites
      bathrooms
      garageSpots
      description
      development {
        uuid
        name
        images(isActive: true) {
          filename
          position
        }
      }
      units {
        uuid
        area
        floor
        price
        rooms
        suites
        bathrooms
        garageSpots
      }
      images(isActive: true) {
        id
        filename
      }
      matterportCode
      owner {
        id
      }
    }
  }
`

export const GET_LISTING_STATS = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      id
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

export const GET_DISTRICTS = gql`
  {
    districts {
      citySlug
      stateSlug
      nameSlug
      city
      state
      name
    }
  }
`

export const GET_NEIGHBORHOOD_DESCRIPTION = gql`
  query district($citySlug: String, $nameSlug: String, $stateSlug: String) {
    district(citySlug: $citySlug, nameSlug: $nameSlug, stateSlug: $stateSlug) {
      name
      description
    }
  }
`

export const ADDRESS_IS_COVERED = gql`
  query addressIsCovered($city: String!, $neighborhood: String!, $state: String!) {
    addressIsCovered(city: $city, neighborhood: $neighborhood, state: $state)
  }
`

export const TOUR_OPTIONS = gql`
  {
    tourOptions
  }
`

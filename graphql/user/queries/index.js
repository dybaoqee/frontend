import gql from 'graphql-tag'

export const GET_FAVORITE_LISTINGS = gql`
  {
    favoritedListings {
      id
    }
  }
`

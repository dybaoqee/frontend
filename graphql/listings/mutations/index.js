import gql from 'graphql-tag'

export const FAVORITE_LISTING = gql`
  mutation favoriteListing($id: ID!) {
    favoriteListing(id: $id) {
      id
      type
    }
  }
`

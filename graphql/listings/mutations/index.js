import gql from 'graphql-tag'

export const FAVORITE_LISTING = gql`
  mutation favoriteListing($id: ID!) {
    favoriteListing(id: $id) {
      id
      type
    }
  }
`

export const UNFAVORITE_LISTING = gql`
  mutation unfavoriteListing($id: ID!) {
    unfavoriteListing(id: $id) {
      id
      type
    }
  }
`

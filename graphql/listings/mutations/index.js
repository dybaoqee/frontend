import gql from 'graphql-tag'

export const FAVORITE_LISTING = gql`
  mutation favoriteListing($id: ID!) {
    favoriteListing(id: $id) {
      listing {
        id
      }
    }
  }
`

export const UNFAVORITE_LISTING = gql`
  mutation unfavoriteListing($id: ID!) {
    unfavoriteListing(id: $id) {
      listing {
        id
      }
    }
  }
`

export const VISUALIZE_TOUR = gql`
  mutation tourVisualized($id: ID!) {
    tourVisualized(id: $id) {
      id
    }
  }
`

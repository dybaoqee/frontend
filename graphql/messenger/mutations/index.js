import gql from 'graphql-tag'

export const SEND_MESSAGE = gql`
  mutation favoriteListing($listingId: ID, $message: String, $receiverId: ID!) {
    sendMessage(
      listingId: $listingId
      message: $message
      receiverId: $receiverId
    ) {
      id
      notified
      read
      receiver {
        name
        id
      }
      sender {
        id
        name
      }
    }
  }
`

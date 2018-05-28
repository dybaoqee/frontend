import gql from 'graphql-tag'

export const SEND_MESSAGE = gql`
  mutation sendMessage($listingId: ID!, $message: String, $receiverId: ID!) {
    sendMessage(
      listingId: $listingId
      message: $message
      receiverId: $receiverId
    ) {
      id
      message
      insertedAt
      sender {
        id
      }
    }
  }
`

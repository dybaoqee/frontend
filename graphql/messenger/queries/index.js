import gql from 'graphql-tag'

export const GET_LISTING_MESSAGES = gql`
  query listingUserMessages($listingId: ID!, $senderId: ID!) {
    listingUserMessages(listingId: $listingId, senderId: $senderId) {
      user {
        id
        name
        email
        phone
      }
      messages {
        id
        message
        insertedAt
        sender {
          id
        }
      }
    }
  }
`

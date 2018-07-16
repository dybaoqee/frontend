import gql from 'graphql-tag'

export const GET_LISTING_MESSAGES = gql`
  query listingUserMessages($listingId: ID!, $senderId: ID!) {
    listingUserMessages(listingId: $listingId, senderId: $senderId) {
      user {
        id
        name
        email
        phone
        role
      }
      messages {
        id
        message
        insertedAt
        sender {
          id
          role
          name
        }
      }
    }
  }
`

export const GET_USER_CONVERSATIONS = gql`
  query {
    userChannels {
      id
      listing {
        id
        address {
          street
          neighborhood
        }
      }
      messages(limit: 1) {
        id
        message
        insertedAt
      }
      participant1 {
        id
        name
        email
        role
      }
      participant2 {
        id
        name
        email
        role
      }
    }
  }
`

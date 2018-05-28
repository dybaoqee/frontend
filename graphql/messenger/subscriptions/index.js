import gql from 'graphql-tag'

export const MESSAGE_SENT = gql`
  subscription {
    messageSent {
      id
      message
      notified
      read
      insertedAt
      sender {
        id
        name
        email
        phone
        role
      }
    }
  }
`

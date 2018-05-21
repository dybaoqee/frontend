import gql from 'graphql-tag'

export const MESSAGE_SENT = gql`
  subscription {
    messageSent {
      message
      sender {
        name
      }
    }
  }
`

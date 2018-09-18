import gql from 'graphql-tag'

export const EDIT_PROFILE = gql`
  mutation editUserProfile(
    $id: ID!
    $name: String
    $phone: String
    $emailPreference: Boolean
  ) {
    editUserProfile(
      id: $id
      name: $name
      phone: $phone
      notificationPreferences: {email: $emailPreference}
    ) {
      id
      name
      phone
      email
      notificationPreferences {
        email
      }
    }
  }
`

export const EDIT_EMAIL = gql`
  mutation changeEmail($id: ID!, $email: String) {
    changeEmail(id: $id, email: $email) {
      id
      name
      phone
      email
    }
  }
`

export const EDIT_PASSWORD = gql`
  mutation changePassword(
    $id: ID!
    $currentPassword: String
    $newPassword: String
  ) {
    changePassword(
      id: $id
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
      name
      phone
      email
    }
  }
`

export const SIGN_IN_ACCOUNT_KIT = gql`
  mutation accountKitSignIn($accessToken: String!) {
    accountKitSignIn(accessToken: $accessToken) {
      jwt
      user {
        name
        id
        email
        phone
        role
      }
    }
  }
`

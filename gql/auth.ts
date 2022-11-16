import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authToken {
        token
        expiresAt
      }
      refreshToken {
        token
        expiresAt
      }
    }
  }
`

export const REFRESH_AUTH_TOKEN = gql`
  mutation {
    refreshAuthToken {
      authToken {
        expiresAt
        token
      }
      refreshToken {
        expiresAt
        token
      }
    }
  }
`
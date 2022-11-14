import { gql } from '@apollo/client';

export const refresh_auth_token = gql`
  mutation refreshAuthToken {
    authToken
    refreshToken
  }
`
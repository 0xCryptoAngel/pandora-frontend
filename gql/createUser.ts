import { gql } from '@apollo/client'

export const create_user = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      _id
      createdAt
      deleted {
        adminId
        date
      }
      email
      lastLoginDate
      referralCode
      updatedAt
    }
  }
`
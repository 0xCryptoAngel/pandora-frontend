import { gql } from '@apollo/client';

export const me = gql`
  query me {
    _id
    createdAt
    deleted {
      adminId
      date
    }
    email
    lastLoginDate
    referralCode
    transactionId
    updatedAt
  }
`
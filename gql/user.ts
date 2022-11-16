import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me {
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
  }
`

export const GET_USERS = gql`
  query users ($filter: UsersQueryFilterInput, $page: Int, $perPage: Int, $sortField: userSortFields, $sortOrder: Direction) {
    users(filter: $filter, page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {
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
  }
`

export const CREATE_USER = gql`
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

export const GET_USER_METADATA = gql`
  query userMetadata ($filter: UsersQueryFilterInput, $page: Int, $perPage: Int, $sortField: userSortFields, $sortOrder: Direction) {
    userMetadata (filter: $filter, page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {
      count
    }
  }
`
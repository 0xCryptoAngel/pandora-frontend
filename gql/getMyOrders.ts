import { gql } from '@apollo/client';

export const getMyOrders = gql`
query getMyOrders {
  _id
  buyerId
  categories {
    _id
    amountSaved
    categories {
      _id
      createdAt
      deleted
      imageUrl
      name
      updatedAt
    }
  }
}
`
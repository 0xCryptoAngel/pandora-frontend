import { gql } from '@apollo/client';

export const GET_DEALS = gql`
  query($filter: ListDealFilterInputDto, $page: Int, $perPage: Int, $sortField: ListDealInputSortFields, $sortOrder: Direction) {
    deals (filter: $filter, page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {
      _id
      amountSaved
      categories {
        _id
        createdAt
        deleted {
          adminId
          date
        }
        imageUrl
        name
        updatedAt
      }
      categoriesIds
      companyDesc
      companyLogoURL
      companyName
      createdAt
      descriptionInHTML
      externalLink
      name
      promoText
      redeemedAmount
      requirements
      smallDesc
      type {
        kind
      }
      updatedAt
      videoUrl
    }
  }
`

export const REDEEM_OFFER = gql`
  mutation redeemOffer ($collectionFound: String, $dealId: String!) {
    redeemOffer(collectionFound: $collectionFound, dealId: $dealId) {
      promoCode
    }
  }
`


export const GET_MY_ORDERS = gql`
  query {
    getMyOrders {
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
  }
`
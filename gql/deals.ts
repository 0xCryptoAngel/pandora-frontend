import { gql } from '@apollo/client';

export const deals = gql`
  query($filter: ListDealFilterInputDto, $page: Int, $perPage: Int, $sortField: ListDealInputSortFields, $sortOrder: Direction) {
    deals {
      _id
      amountSaved
      categories
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
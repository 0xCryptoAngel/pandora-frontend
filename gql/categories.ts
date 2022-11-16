import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query categories ($filter: LisCategoriesFilterInputDto, $page: Int, $perPage: Int, $sortField: ListCategoriesInputSortFields, $sortOrder: Direction) {
    categories(filter:$filter, page:$page, perPage: $perPage, sortField: $sortField, sortOrder:$sortOrder) {
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
  }
`
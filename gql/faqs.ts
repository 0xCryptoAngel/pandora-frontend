import { gql } from '@apollo/client';

export const GET_FAQS = gql`
query faq($page: Int, $perPage: Int, $sortField: ListFaqInputSortFields, $sortOrder: Direction) {
  faq(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {
    _id
    answer
    createdAt
    question
    updatedAt
  }
}
`
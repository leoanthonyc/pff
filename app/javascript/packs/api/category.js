import { gql } from "@apollo/client";

export const SAVE_CATEGORY_MUTATION = gql`
  mutation SaveCategory(
    $id: ID
    $name: String!
    $budget: Int!
    $categoryGroupId: ID!
  ) {
    saveCategory(
      input: {
        id: $id
        name: $name
        budget: $budget
        categoryGroupId: $categoryGroupId
      }
    ) {
      category {
        id
        name
      }
    }
  }
`;

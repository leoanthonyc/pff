import { gql } from "@apollo/client";

export const SAVE_CATEGORY_MUTATION = gql`
  mutation SaveCategory(
    $id: ID
    $name: String!
    $categoryGroupId: ID!
    $goal: Int
  ) {
    saveCategory(
      input: {
        id: $id
        name: $name
        categoryGroupId: $categoryGroupId
        goal: $goal
      }
    ) {
      category {
        id
        name
        goal
      }
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID) {
    deleteCategory(input: { id: $id }) {
      success
    }
  }
`;

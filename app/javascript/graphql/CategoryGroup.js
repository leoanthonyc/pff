import { gql } from "@apollo/client";

export const CATEGORY_GROUPS_QUERY = gql`
  query CategoryGroups {
    categoryGroups {
      id
      name
      categories {
        id
        name
        goal
        categoryGroup {
          id
        }
      }
    }
  }
`;

export const SAVE_CATEGORY_GROUP_MUTATION = gql`
  mutation SaveCategoryGroup($id: ID, $name: String!) {
    saveCategoryGroup(input: { id: $id, name: $name }) {
      categoryGroup {
        id
        name
      }
    }
  }
`;

export const DELETE_CATEGORY_GROUP_MUTATION = gql`
  mutation DeleteCategoryGroup($id: ID) {
    deleteCategoryGroup(input: { id: $id }) {
      success
    }
  }
`;

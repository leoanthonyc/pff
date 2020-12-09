import { gql } from "@apollo/client";

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

export const CATEGORY_GROUPS_QUERY = gql`
  query CategoryGroups {
    categoryGroups {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

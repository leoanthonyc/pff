import { gql } from "@apollo/client";

export const SAVE_CATEGORY_GROUP = gql`
  mutation SaveCategoryGroup($id: ID, $name: String!) {
    saveCategoryGroup(input: { id: $id, name: $name }) {
      categoryGroup {
        id
        name
      }
    }
  }
`;

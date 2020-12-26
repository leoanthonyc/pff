import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY_GROUP_MUTATION } from "../graphql/CategoryGroup";

const useDeleteCategoryGroupMutation = (categoryGroup) => {
  const [deleteCategoryGroup] = useMutation(DELETE_CATEGORY_GROUP_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          categoryGroups(existingCategoryGroups = [], { readField }) {
            return existingCategoryGroups.filter(
              (ref) => readField("id", ref) !== categoryGroup.id
            );
          },
        },
      });
    },
  });

  return { deleteCategoryGroup };
};

export default useDeleteCategoryGroupMutation;

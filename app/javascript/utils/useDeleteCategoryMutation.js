import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY_MUTATION } from "../graphql/Category";

const useDeleteCategoryMutation = (category) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    update(cache) {
      cache.modify({
        id: cache.identify(category.categoryGroup),
        fields: {
          categories(existingCategories = [], { readField }) {
            return existingCategories.filter(
              (ref) => readField("id", ref) !== category.id
            );
          },
        },
      });
    },
  });
  return { deleteCategory };
};

export default useDeleteCategoryMutation;

import { useMutation, gql } from "@apollo/client";
import { SAVE_CATEGORY_MUTATION } from "../graphql/Category";

const useSaveCategoryMutation = () => {
  const [saveCategory] = useMutation(SAVE_CATEGORY_MUTATION, {
    update(cache, { data: { saveCategory } }) {
      cache.modify({
        fields: {
          categoryGroups() {
            cache.writeFragment({
              data: saveCategory.category,
              fragment: gql`
                fragment NewCategory on Category {
                  id
                  name
                }
              `,
            });
          },
        },
      });
    },
  });

  return { saveCategory };
};

export default useSaveCategoryMutation;

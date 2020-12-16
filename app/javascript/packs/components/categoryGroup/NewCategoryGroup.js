import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { SAVE_CATEGORY_GROUP_MUTATION } from "../../graphql/CategoryGroup";

const NewCategoryGroup = () => {
  const [name, setName] = useState("");
  const [saveCategoryGroup] = useMutation(SAVE_CATEGORY_GROUP_MUTATION, {
    update(cache, { data: { saveCategoryGroup } }) {
      cache.modify({
        fields: {
          categoryGroups(existingCategoryGroups = []) {
            const newCategoryGroup = cache.writeFragment({
              data: saveCategoryGroup.categoryGroup,
              fragment: gql`
                fragment NewCategoryGroup on CategoryGroup {
                  id
                  name
                }
              `,
            });
            return [...existingCategoryGroups, newCategoryGroup];
          },
        },
      });
    },
  });

  const handleSave = () => {
    saveCategoryGroup({ variables: { name } });
    setName("");
  };

  return (
    <div className="new-category-group">
      <h3>Add New Category Group</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default NewCategoryGroup;

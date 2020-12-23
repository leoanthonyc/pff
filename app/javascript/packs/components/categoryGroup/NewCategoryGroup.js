import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { SAVE_CATEGORY_GROUP_MUTATION } from "../../graphql/CategoryGroup";

const NewCategoryGroup = ({ onClose }) => {
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
    onClose();
  };

  return (
    <tr className="border-t border-b border-dotted">
      <td>
        <input
          type="text"
          value={name}
          placeholder={"new category group"}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td></td>
      <td>
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </td>
    </tr>
  );
};

export default NewCategoryGroup;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
import { SAVE_CATEGORY_MUTATION } from "../../graphql/Category";

const NewCategory = ({ categoryGroupId }) => {
  const [name, setName] = useState("");
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

  const handleSave = () => {
    saveCategory({ variables: { categoryGroupId, name, budget: 0 } });
    setName("");
  };

  return (
    <div className="new-category">
      <input
        type="text"
        value={name}
        placeholder="new category"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

NewCategory.propTypes = {
  categoryGroupId: PropTypes.string.isRequired,
};

export default NewCategory;

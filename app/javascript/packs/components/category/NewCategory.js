import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { SAVE_CATEGORY_MUTATION } from "../../api/category";

const NewCategory = ({ categoryGroupId }) => {
  const [name, setName] = useState("");
  const [saveCategory] = useMutation(SAVE_CATEGORY_MUTATION);

  const handleSave = () => {
    saveCategory({ variables: { categoryGroupId, name, budget: 0 } });
  };

  return (
    <div className="new-category">
      <input
        type="text"
        value={name}
        placeholder="new category"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

NewCategory.propTypes = {
  categoryGroupId: PropTypes.string.isRequired,
};

export default NewCategory;

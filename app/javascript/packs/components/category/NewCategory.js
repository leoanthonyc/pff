import React, { useState } from "react";
import PropTypes from "prop-types";
import useSaveCategoryMutation from "../../utils/useSaveCategoryMutation";

const NewCategory = ({ categoryGroupId }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const { saveCategory } = useSaveCategoryMutation();

  const handleSave = () => {
    saveCategory({ variables: { categoryGroupId, name, budget: 0 } });
    setName("");
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={name}
          placeholder="new category"
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </td>
      <td>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </td>
    </tr>
  );
};

NewCategory.propTypes = {
  categoryGroupId: PropTypes.string.isRequired,
};

export default NewCategory;

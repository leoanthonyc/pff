import React, { useState } from "react";
import PropTypes from "prop-types";
import useSaveCategoryMutation from "../../utils/useSaveCategoryMutation";

const NewCategory = ({ categoryGroupId, onClose }) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const { saveCategory } = useSaveCategoryMutation();

  const handleSave = () => {
    saveCategory({ variables: { categoryGroupId, name, budget } });
    setName("");
    setBudget(0);
    onClose();
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
          value={budget}
          onChange={(e) => setBudget(+e.target.value)}
        />
      </td>
      <td></td>
      <td>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

NewCategory.propTypes = {
  categoryGroupId: PropTypes.string.isRequired,
};

export default NewCategory;

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_CATEGORY_GROUP } from "../../api/useSaveCategoryGroupMutation";

const NewCategoryGroup = () => {
  const [name, setName] = useState("");
  const [saveCategoryGroup] = useMutation(SAVE_CATEGORY_GROUP);

  const handleSave = () => {
    saveCategoryGroup({ variables: { name } });
    setName("");
  };

  return (
    <div className="new-category-group">
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

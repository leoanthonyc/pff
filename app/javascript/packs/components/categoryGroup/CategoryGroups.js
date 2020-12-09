import React, { useState } from "react";
import PropTypes from "prop-types";
import Categories from "../category/Categories";

const CategoryGroup = ({ categoryGroup }) => {
  const [name, setName] = useState(categoryGroup.name);
  const [editing, setEditing] = useState(false);
  return (
    <>
      {editing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" onClick={() => setEditing(false)}>
            Save
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            Delete
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div>
            {name}
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        </div>
      )}
      <Categories
        categoryGroupId={categoryGroup.id}
        categories={categoryGroup.categories}
      />
    </>
  );
};

CategoryGroup.propTypes = {
  categoryGroup: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const CategoryGroups = ({ categoryGroups }) => {
  return (
    <div>
      {categoryGroups.map((categoryGroup) => (
        <CategoryGroup key={categoryGroup.id} categoryGroup={categoryGroup} />
      ))}
    </div>
  );
};

CategoryGroups.propTypes = {
  categoryGroups: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
};

export default CategoryGroups;

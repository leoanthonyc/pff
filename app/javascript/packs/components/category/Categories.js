import React, { useState } from "react";
import PropTypes from "prop-types";
import NewCategory from "./NewCategory";

const Category = ({ category }) => {
  const [name, setName] = useState(category.name);
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
    </>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Categories = ({ categoryGroupId, categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      <NewCategory categoryGroupId={categoryGroupId} />
    </div>
  );
};

Categories.propTypes = {
  categoryGroupId: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Categories;

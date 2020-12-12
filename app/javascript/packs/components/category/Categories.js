import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY_MUTATION } from "../../api/category";
import NewCategory from "./NewCategory";

const Category = ({ category }) => {
  const [name, setName] = useState(category.name);
  const [editing, setEditing] = useState(false);
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    update(cache) {
      cache.modify({
        id: cache.identify(category.categoryGroup),
        fields: {
          categories(existingCategories = [], { readField }) {
            return existingCategories.filter(
              (ref) => readField("id", ref) !== category.id
            );
          },
        },
      });
    },
  });

  const handleDelete = () => {
    deleteCategory({ variables: { id: category.id } }).then(() =>
      setEditing(false)
    );
  };

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
          <button type="button" onClick={() => handleDelete()}>
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

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import {
  SAVE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from "../../api/category";
import NewCategory from "./NewCategory";

const Category = ({ category, categoryGroupId }) => {
  const [name, setName] = useState(category.name);
  const [editing, setEditing] = useState(false);
  const [saveCategory] = useMutation(SAVE_CATEGORY_MUTATION);
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

  const handleDelete = async () => {
    await deleteCategory({ variables: { id: category.id } });
    setEditing(false);
  };

  const handleSave = async () => {
    await saveCategory({
      variables: {
        id: category.id,
        name: name,
        budget: 0,
        categoryGroupId: categoryGroupId,
      },
    });
    setEditing(false);
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
          <button type="button" onClick={() => handleSave()}>
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
  categoryGroupId: PropTypes.string.isRequired,
};

const Categories = ({ categoryGroupId, categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          categoryGroupId={categoryGroupId}
        />
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

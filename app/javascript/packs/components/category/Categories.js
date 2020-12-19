import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import {
  SAVE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from "../../graphql/Category";
import NewCategory from "./NewCategory";

const Category = ({ category, categoryGroupId }) => {
  const [name, setName] = useState(category.name);
  const [budget, setBudget] = useState(category.budget);
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
        name,
        budget,
        id: category.id,
        categoryGroupId: categoryGroupId,
      },
    });
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <tr>
          <td>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(+e.target.value)}
            />
          </td>
          <td>
            <button type="button" onClick={() => handleSave()}>
              Save
            </button>
            <button type="button" onClick={() => handleDelete()}>
              Delete
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{name}</td>
          <td>{budget}</td>
          <td>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </td>
        </tr>
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
    <>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          categoryGroupId={categoryGroupId}
        />
      ))}
      <NewCategory categoryGroupId={categoryGroupId} />
    </>
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

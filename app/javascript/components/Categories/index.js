import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import {
  SAVE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from "../../graphql/Category";

const Category = ({ category, categoryGroupId }) => {
  const [name, setName] = useState(category.name);
  const [goal, setGoal] = useState(category.goal);
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
        goal,
        id: category.id,
        categoryGroupId: categoryGroupId,
      },
    });
    setEditing(false);
  };

  return (
    <tr className="border-t border-b border-dotted">
      {editing ? (
        <>
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
              value={goal}
              onChange={(e) => setGoal(+e.target.value)}
            />
          </td>
          <td>{category.remaining}</td>
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
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{goal}</td>
          <td>{category.remaining}</td>
          <td>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
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

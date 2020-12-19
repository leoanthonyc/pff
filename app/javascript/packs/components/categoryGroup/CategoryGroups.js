import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";
import {
  CATEGORY_GROUPS_QUERY,
  SAVE_CATEGORY_GROUP_MUTATION,
  DELETE_CATEGORY_GROUP_MUTATION,
} from "../../graphql/CategoryGroup";
import Categories from "../category/Categories";
import NewCategoryGroup from "./NewCategoryGroup";

const CategoryGroup = ({ categoryGroup }) => {
  const [name, setName] = useState(categoryGroup.name);
  const [editing, setEditing] = useState(false);
  const [saveCategoryGroup] = useMutation(SAVE_CATEGORY_GROUP_MUTATION);
  const [deleteCategoryGroup] = useMutation(DELETE_CATEGORY_GROUP_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          categoryGroups(existingCategoryGroups = [], { readField }) {
            return existingCategoryGroups.filter(
              (ref) => readField("id", ref) !== categoryGroup.id
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    deleteCategoryGroup({ variables: { id: categoryGroup.id } });
    setEditing(false);
  };

  const handleSave = async () => {
    saveCategoryGroup({ variables: { id: categoryGroup.id, name: name } });
    setEditing(false);
  };

  const totalBudgeted = useMemo(() => {
    return categoryGroup.categories
      .map((c) => c.budget)
      .reduce((acc, cv) => (acc = acc + cv), 0);
  }, [categoryGroup]);

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
          <td>{totalBudgeted}</td>
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
          <td>
            <strong>{name}</strong>
          </td>
          <td>{totalBudgeted}</td>
          <td>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </td>
        </tr>
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

const CategoryGroups = () => {
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <NewCategoryGroup />
      <table>
        <thead>
          <tr>
            <th> Name</th>
            <th> Budgeted</th>
            <th> Actions</th>
          </tr>
        </thead>
        <tbody>
          {(data.categoryGroups || []).map((categoryGroup) => (
            <CategoryGroup
              key={categoryGroup.id}
              categoryGroup={categoryGroup}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryGroups;

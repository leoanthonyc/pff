import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";
import {
  CATEGORY_GROUPS_QUERY,
  DELETE_CATEGORY_GROUP_MUTATION,
} from "../../api/categoryGroup";
import Categories from "../category/Categories";
import NewCategoryGroup from "./NewCategoryGroup";

const CategoryGroup = ({ categoryGroup }) => {
  const [name, setName] = useState(categoryGroup.name);
  const [editing, setEditing] = useState(false);
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

  const handleDelete = () => {
    deleteCategoryGroup({ variables: { id: categoryGroup.id } }).then(() =>
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
            <strong>{name}</strong>
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

const CategoryGroups = () => {
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <NewCategoryGroup />
      {(data.categoryGroups || []).map((categoryGroup) => (
        <CategoryGroup key={categoryGroup.id} categoryGroup={categoryGroup} />
      ))}
    </div>
  );
};

export default CategoryGroups;

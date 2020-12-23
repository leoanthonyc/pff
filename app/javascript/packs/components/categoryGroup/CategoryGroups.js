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
import NewCategory from "../category/NewCategory";

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

  const totalRemaining = 0;
  const [newEntry, setNewEntry] = useState(false);

  return (
    <>
      {editing ? (
        <tr className="bg-gray-100 border-t border-b border-dotted">
          <td>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td>{totalBudgeted}</td>
          <td>{totalRemaining}</td>
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
        <tr className="bg-gray-100 border-t border-b border-dotted">
          <td>
            <div className="flex">
              <div>
                <strong>{name}</strong>
              </div>
              <div className="pl-2">
                <button
                  className="text-gray-500 hover:text-black"
                  type="button"
                  onClick={() => setNewEntry(true)}
                >
                  + category
                </button>
              </div>
            </div>
          </td>
          <td>{totalBudgeted}</td>
          <td>{totalRemaining}</td>
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
      {newEntry && (
        <NewCategory
          categoryGroupId={categoryGroup.id}
          onClose={() => setNewEntry(false)}
        />
      )}
    </>
  );
};

CategoryGroup.propTypes = {
  categoryGroup: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const CategoryGroups = () => {
  const [newEntry, setNewEntry] = useState(false);
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="pb-4">
        <button
          className="rounded-lg p-2 text-gray-100 hover:text-white bg-blue-500 font-semibold shadow-md"
          type="button"
          onClick={() => setNewEntry(true)}
        >
          New Category Group
        </button>
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Budgeted</th>
            <th>Remaining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newEntry && <NewCategoryGroup onClose={() => setNewEntry(false)} />}
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

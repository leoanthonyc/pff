import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import {
  SAVE_CATEGORY_GROUP_MUTATION,
  DELETE_CATEGORY_GROUP_MUTATION,
} from "../../graphql/CategoryGroup";
import Categories from "../Categories";
import NewCategory from "../Categories/NewCategory";
import Modal from "../Modal";

const CategoryGroup = ({ categoryGroup }) => {
  const [name, setName] = useState(categoryGroup.name);
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
    setShow(false);
  };

  const handleSave = async () => {
    saveCategoryGroup({ variables: { id: categoryGroup.id, name: name } });
    setShow(false);
  };

  const handleCancel = () => {
    setName(categoryGroup.name);
    setShow(false);
  };

  const totalGoal = useMemo(() => {
    return categoryGroup.categories
      .map((c) => c.goal)
      .reduce((acc, cv) => (acc = acc + cv), 0);
  }, [categoryGroup]);

  const totalRemaining = 0;

  const [show, setShow] = useState(false);
  const modalBody = (
    <div>
      Name
      <input
        className="block border border-gray-500"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );

  const modalActions = (
    <>
      <div className="flex-grow-0">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm left-0"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
      <div className="flex-grow flex justify-end">
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </>
  );
  return (
    <>
      <tr className="bg-gray-100 border-t border-b border-dotted">
        <td>
          <div className="flex">
            <div>
              <strong>{name}</strong>
            </div>
            <div className="pl-2">
              <NewCategory categoryGroupId={categoryGroup.id} />
            </div>
          </div>
        </td>
        <td>{totalGoal}</td>
        <td>{totalRemaining}</td>
        <td>
          <button type="button" onClick={() => setShow(true)}>
            Edit
          </button>
          {show && (
            <Modal
              header="Edit Category Group"
              body={modalBody}
              actions={modalActions}
            />
          )}
        </td>
      </tr>
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

export default CategoryGroup;
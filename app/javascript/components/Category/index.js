import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import Modal from "../Modal";
import { SAVE_CATEGORY_MUTATION } from "../../graphql/Category";
import useDeleteCategoryMutation from "../../utils/useDeleteCategoryMutation";

const Category = ({ category, categoryGroupId, transactions }) => {
  const [name, setName] = useState(category.name);
  const [goal, setGoal] = useState(category.goal);
  const [saveCategory] = useMutation(SAVE_CATEGORY_MUTATION);
  const { deleteCategory } = useDeleteCategoryMutation(category);

  const handleDelete = async () => {
    await deleteCategory({ variables: { id: category.id } });
    setShow(false);
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
    setShow(false);
  };

  const handleCancel = () => {
    setName(category.name);
    setShow(false);
  };

  const currentValue = useMemo(() => {
    return goal + transactions.reduce((acc, t) => (acc = acc + t.value), 0);
  }, [transactions]);

  console.log(transactions);

  const [show, setShow] = useState(false);
  const modalBody = (
    <>
      <div className="py-1">
        Name
        <input
          className="block border border-gray-500 rounded p-1 text-sm"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="py-1">
        Goal
        <input
          className="block border border-gray-500 rounded p-1 text-sm"
          type="number"
          value={goal}
          onChange={(e) => setGoal(+e.target.value)}
        />
      </div>
    </>
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
    <tr className="border-t border-b border-dotted">
      <td className="px-2">{name}</td>
      <td className="px-2">{goal}</td>
      <td className="px-2">
        <div className={currentValue >= 0 ? "text-green-700" : "text-red-700"}>
          {currentValue}
        </div>
      </td>
      <td className="px-2">
        <button
          className="border border-transparent hover:border-gray-300 py-0.5 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
          type="button"
          onClick={() => setShow(true)}
        >
          Edit
        </button>
        {show && (
          <Modal
            header="Edit Category"
            body={modalBody}
            actions={modalActions}
          />
        )}
      </td>
    </tr>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  categoryGroupId: PropTypes.string.isRequired,
};

export default Category;

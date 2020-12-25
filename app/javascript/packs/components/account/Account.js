import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../modal";
import useSaveAccountMutation from "../../utils/useSaveAccountMutation";
import useDeleteAccountMutation from "../../utils/useDeleteAccountMutation";

const Account = ({ account }) => {
  const [name, setName] = useState(account.name);
  const { saveAccount } = useSaveAccountMutation();
  const { deleteAccount } = useDeleteAccountMutation(account);
  const handleSave = () => {
    saveAccount({ variables: { id: account.id, name, initialValue: 0 } });
    setShow(false);
  };
  const handleDelete = () => {
    deleteAccount({ variables: { id: account.id } });
    setShow(false);
  };
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
          onClick={() => setShow(false)}
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
    <li key={account.id}>
      <NavLink
        className="flex justify-between w-full"
        activeClassName="rounded-md bg-gray-300"
        to={`/accounts/${account.id}`}
      >
        <div className="flex-1">{name}</div>
        <div className="flex-initial flex justify-end text-sm text-gray-700">
          <button type="button" onClick={() => setShow(true)}>
            edit
          </button>
        </div>
        {show && (
          <Modal
            header="Edit Account"
            body={modalBody}
            actions={modalActions}
          />
        )}
      </NavLink>
    </li>
  );
};

export default Account;

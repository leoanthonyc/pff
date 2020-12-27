import React, { useState } from "react";
import Modal from "../Modal";
import useSaveAccountMutation from "../../utils/useSaveAccountMutation";

const NewAccount = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [initialValue, setInitialValue] = useState(0);
  const { saveAccount } = useSaveAccountMutation();

  const handleSave = () => {
    saveAccount({ variables: { name, initialValue } });
    setName("");
    setInitialValue(0);
    setShow(false);
  };

  const modalBody = (
    <>
      <div className="py-2">
        Name
        <input
          className="block border border-gray-500 rounded p-1 text-sm"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="py-2">
        Initial Value
        <input
          className="block border border-gray-500 rounded p-1 text-sm"
          type="number"
          value={initialValue}
          onChange={(e) => setInitialValue(+e.target.value)}
        />
      </div>
    </>
  );
  const modalActions = (
    <div className="w-full flex justify-end">
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
  );

  return (
    <div className="ml-2">
      <button
        className="border border-transparent hover:border-gray-300 py-0.5 px-2 rounded-md focus:bg-gray-300 focus:outline-none font-medium"
        type="button"
        onClick={() => setShow(true)}
      >
        + New Account
      </button>
      {show && (
        <Modal header="New Account" body={modalBody} actions={modalActions} />
      )}
    </div>
  );
};

export default NewAccount;

import React, { useState } from "react";
import useSaveAccountMutation from "../../utils/useSaveAccountMutation";

const AccountModal = ({ account }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(account?.name || "");
  const [initialValue, setInitialValue] = useState(account?.value || 0);
  const { saveAccount } = useSaveAccountMutation();

  const handleSave = () => {
    saveAccount({ variables: { id: account?.id ?? null, name, initialValue } });
    setShow(false);
  };

  return (
    <div>
      <button
        className="border border-transparent hover:border-gray-300 py-0.5 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
        type="button"
        onClick={() => setShow(true)}
      >
        + New Account
      </button>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      New Account
                    </h3>
                    <div className="mt-2">
                      <div>
                        Name
                        <input
                          className="block border border-gray-500"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        Initial Value
                        <input
                          className="block border border-gray-500"
                          type="number"
                          value={initialValue}
                          onChange={(e) => setInitialValue(+e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountModal;

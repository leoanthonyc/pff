import React, { useEffect, useState } from "react";
import useAccountsQuery from "../../utils/useAccountsQuery";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";
import useSaveTransactionMutation from "../../utils/useSaveTransactionMutation";

const NewTransaction = ({ accountId, onClose }) => {
  const [payee, setPayee] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(accountId || "");
  const [note, setNote] = useState("");
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);
  const { categoryGroups } = useCategoryGroupsQuery();
  const { accounts } = useAccountsQuery();

  const { saveTransaction } = useSaveTransactionMutation();

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        note,
        categoryId,
        payee,
        value: inflow + outflow * -1,
        accountId: selectedAccount,
      },
    });
    setNote("");
    setInflow("");
    setOutflow("");
    setPayee("");
    onClose();
  };

  useEffect(() => {
    setCategoryId(categoryGroups[0]?.categories[0].id);
  }, [categoryGroups]);

  return (
    <tr className="border-t border-b border-dotted">
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
        />
      </td>
      <td className="px-2">
        <select
          className="ring ring-blue-500 rounded-sm"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {accounts.map((account) => {
            return (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            );
          })}
        </select>
      </td>
      <td className="px-2">
        <select
          className="ring ring-blue-500 rounded-sm"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categoryGroups.map((categoryGroup) => {
            return (
              <optgroup key={categoryGroup.id || ""} label={categoryGroup.name}>
                {categoryGroup.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </td>
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </td>
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          placeholder="outflow"
          value={outflow}
          onChange={(e) => setOutflow(+e.target.value)}
        />
      </td>
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          placeholder="inflow"
          value={inflow}
          onChange={(e) => setInflow(+e.target.value)}
        />
      </td>
      <td className="px-1">
        <button
          className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
          type="button"
          onClick={() => handleSave()}
        >
          Save
        </button>
        <button
          className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
          type="button"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default NewTransaction;

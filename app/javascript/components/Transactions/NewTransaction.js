import React, { useEffect, useState } from "react";
import useAccountsQuery from "../../utils/useAccountsQuery";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";
import useSaveTransactionMutation from "../../utils/useSaveTransactionMutation";

const NewTransaction = ({ onClose }) => {
  const [name, setName] = useState("");
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [payee, setPayee] = useState("");
  const { categoryGroups } = useCategoryGroupsQuery();
  const { accounts } = useAccountsQuery();

  const { saveTransaction } = useSaveTransactionMutation();

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        name,
        value: inflow + outflow * -1,
        categoryId,
        accountId,
        payee,
      },
    });
    setName("");
    setInflow("");
    setOutflow("");
    setPayee("");
    onClose();
  };

  useEffect(() => {
    setCategoryId(categoryGroups[0]?.categories[0].id);
  }, [categoryGroups]);

  useEffect(() => {
    setAccountId(accounts[0]?.id);
  }, [accounts]);

  return (
    <tr className="border-t border-b border-dotted">
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
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
        />
      </td>
      <td>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
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
      <td>
        <select
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
      <td>
        <input
          type="text"
          placeholder="outflow"
          value={outflow}
          onChange={(e) => setOutflow(+e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="inflow"
          value={inflow}
          onChange={(e) => setInflow(+e.target.value)}
        />
      </td>
      <td>
        <button className="pr-1" type="button" onClick={() => handleSave()}>
          Save
        </button>
        <button type="button" onClick={() => onClose()}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default NewTransaction;

import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { SAVE_TRANSACTION_MUTATION } from "../../graphql/Transaction";
import useAccountsQuery from "../../utils/useAccountsQuery";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";

const NewTransaction = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");
  const { categoryGroups } = useCategoryGroupsQuery();
  const { accounts } = useAccountsQuery();

  const [saveTransaction] = useMutation(SAVE_TRANSACTION_MUTATION, {
    update(cache, { data: { saveTransaction } }) {
      cache.modify({
        fields: {
          transactions(existingTransactions = []) {
            const newTransaction = cache.writeFragment({
              data: saveTransaction.transaction,
              fragment: gql`
                fragment NewTransaction on Transaction {
                  id
                  name
                  account {
                    id
                    name
                  }
                  category {
                    id
                    name
                  }
                }
              `,
            });
            return [...existingTransactions, newTransaction];
          },
        },
      });
    },
  });

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        name,
        categoryId,
        accountId,
      },
    });
    setName("");
  };

  useEffect(() => {
    setCategoryId(categoryGroups[0]?.categories[0].id);
  }, [categoryGroups]);

  useEffect(() => {
    setAccountId(accounts[0]?.id);
  }, [accounts]);

  return (
    <div>
      <strong>New Transaction </strong>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="account">Account</label>
      <select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
        {accounts.map((account) => {
          return (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="category">Category</label>
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
      <button type="button" onClick={() => handleSave()}>
        Save
      </button>
    </div>
  );
};

export default NewTransaction;

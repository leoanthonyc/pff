import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_TRANSACTION_MUTATION,
  SAVE_TRANSACTION_MUTATION,
} from "../../graphql/Transaction";
import useAccountsQuery from "../../utils/useAccountsQuery";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";
import NewTransaction from "./NewTransaction";
import useTransactionsQuery from "../../utils/useTransactionsQuery";

const Transaction = ({ transaction }) => {
  const [name, setName] = useState(transaction.name);
  const [value, setValue] = useState(transaction.value);
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [accountId, setAccountId] = useState(transaction.account.id);
  const [editing, setEditing] = useState(false);
  const { accounts } = useAccountsQuery();
  const { categoryGroups } = useCategoryGroupsQuery();
  const [saveTransaction] = useMutation(SAVE_TRANSACTION_MUTATION);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          transactions(existingTransactions = [], { readField }) {
            return existingTransactions.filter(
              (ref) => readField("id", ref) !== transaction.id
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    await deleteTransaction({ variables: { id: transaction.id } });
    setEditing(false);
  };

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        name,
        value,
        categoryId,
        accountId,
        id: transaction.id,
      },
    });
    setEditing(false);
  };
  return (
    <>
      {editing ? (
        <tr>
          <td>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                  <optgroup
                    key={categoryGroup.id || ""}
                    label={categoryGroup.name}
                  >
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
              type="number"
              value={value}
              onChange={(e) => setValue(+e.target.value)}
            />
          </td>
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
        <>
          <tr>
            <td>{name}</td>
            <td>{transaction.account.name}</td>
            <td>{transaction.category.name}</td>
            <td>{transaction.value || 0}</td>
            <td>
              <button type="button" onClick={() => setEditing(true)}>
                Edit
              </button>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

const Transactions = () => {
  const [newEntry, setNewEntry] = useState(false);
  const {
    transactions,
    transactionsError,
    transactionsLoading,
  } = useTransactionsQuery();
  if (transactionsError) return <div> Error loading transactions :( </div>;
  if (transactionsLoading) return <div> Loading transactions ... </div>;
  return (
    <div>
      <div>
        <button type="button" onClick={() => setNewEntry(true)}>
          New Transaction
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account</th>
            <th>Category</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newEntry && <NewTransaction onClose={() => setNewEntry(false)} />}
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

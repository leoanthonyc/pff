import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [payee, setPayee] = useState(transaction.payee?.name ?? null);
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
        payee,
        id: transaction.id,
      },
    });
    setEditing(false);
  };

  const systemGenerated = transaction.payee.name == "Initial Value";

  return (
    <tr className="border-t border-b border-dotted">
      {editing ? (
        <>
          {systemGenerated ? (
            <>
              <td>{name}</td>
              <td>{payee}</td>
              <td>{transaction.account.name}</td>
              <td>{transaction.category.name}</td>
            </>
          ) : (
            <>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                {payee && (
                  <input
                    type="text"
                    value={payee}
                    onChange={(e) => setPayee(e.target.value)}
                  />
                )}
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
                {transaction.category.name === "notbudgeted" ? (
                  transaction.category.name
                ) : (
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
                )}
              </td>
            </>
          )}
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
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{payee}</td>
          <td>{transaction.account.name}</td>
          <td>{transaction.category.name}</td>
          <td>{transaction.value || 0}</td>
          <td>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const Transactions = () => {
  const [newEntry, setNewEntry] = useState(false);
  let { accountId } = useParams();
  const {
    transactions,
    transactionsError,
    transactionsLoading,
  } = useTransactionsQuery({ variables: { accountId } });
  const account = useMemo(() => transactions[0]?.account, [transactions]);
  if (transactionsError) return <div> Error loading transactions :( </div>;
  if (transactionsLoading) return <div> Loading transactions ... </div>;
  return (
    <div>
      <div className="pb-4 flex justify-between">
        <div className="flex">
          <div className="text-lg font-bold mr-2">{account.name}</div>
          <div
            className={`
            text-xl font-bold
            ${account.value > 0 ? "text-green-400" : "text-red-400"}`}
          >
            {account.value}
          </div>
        </div>
        <button
          className="rounded-lg p-2 text-gray-100 hover:text-white bg-green-500 font-semibold shadow-md"
          type="button"
          onClick={() => setNewEntry(true)}
        >
          New Transaction
        </button>
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Payee</th>
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

import React, { useEffect, useMemo, useState } from "react";
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
  const [payee, setPayee] = useState(transaction.payee?.name ?? "");
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [accountId, setAccountId] = useState(transaction.account.id);
  const [note, setNote] = useState(transaction.note);
  const [inflow, setInflow] = useState(
    transaction.value >= 0 ? transaction.value : 0
  );
  const [outflow, setOutflow] = useState(
    transaction.value < 0 ? transaction.value * -1 : 0
  );
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
        note,
        value: inflow + outflow * -1,
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
              <td className="px-2">{payee}</td>
              <td className="px-2">{transaction.account.name}</td>
              <td className="px-2">{transaction.category.name}</td>
              <td className="px-2">{note}</td>
            </>
          ) : (
            <>
              <td className="px-2">
                {payee && (
                  <input
                    className="ring ring-blue-500 rounded-sm"
                    type="text"
                    value={payee}
                    onChange={(e) => setPayee(e.target.value)}
                  />
                )}
              </td>
              <td className="px-2">
                <select
                  className="ring ring-blue-500 rounded-sm"
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
              <td className="px-2">
                {transaction.category.name === "notbudgeted" ? (
                  transaction.category.name
                ) : (
                  <select
                    className="ring ring-blue-500 rounded-sm"
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
              <td className="px-2">
                <input
                  className="ring ring-blue-500 rounded-sm"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </td>
            </>
          )}
          <td className="px-2">
            <input
              className="ring ring-blue-500 rounded-sm"
              type="text"
              value={outflow}
              onChange={(e) => setOutflow(+e.target.value)}
            />
          </td>
          <td className="px-2">
            <input
              className="ring ring-blue-500 rounded-sm"
              type="text"
              value={inflow}
              onChange={(e) => setInflow(+e.target.value)}
            />
          </td>
          <td className="px-1">
            <button
              className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button
              className="pr-1 border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => handleSave()}
            >
              Save
            </button>
            <button
              className="pr-1 border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-2">{payee}</td>
          <td className="px-2">{transaction.account.name}</td>
          <td className="px-2">{transaction.category.name}</td>
          <td className="px-2">{note}</td>
          <td className="px-2">{outflow}</td>
          <td className="px-2">{inflow}</td>
          <td className="px-1">
            <button
              className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => setEditing(true)}
            >
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
  } = useTransactionsQuery({
    variables: { accountId: accountId !== "all" ? accountId : null },
  });

  const account = useMemo(
    () =>
      accountId !== "all"
        ? transactions[0]?.account
        : {
            name: "All",
            value: transactions.reduce((sum, t) => (sum += t.value), 0),
          },
    [transactions]
  );

  useEffect(() => setNewEntry(false), [accountId]);

  if (transactionsError) return <div> Error loading transactions :( </div>;
  if (transactionsLoading) return <div> Loading transactions ... </div>;

  return (
    <div>
      <div className="p-2 flex justify-between bg-gray-200">
        <div className="flex">
          <div className="text-lg font-bold mr-2">{account.name}</div>
          <div
            className={`
            text-xl font-bold
            ${account.value > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {account.value}
          </div>
        </div>
      </div>
      <div className="py-2">
        <button
          className="border border-transparent hover:border-gray-300 py-0.5 px-2 rounded-md focus:bg-gray-300 focus:outline-none font-medium"
          type="button"
          onClick={() => setNewEntry(true)}
        >
          + New Transaction
        </button>
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200 text-sm">
          <tr>
            <th className="px-2">PAYEE</th>
            <th className="px-2">ACCOUNT</th>
            <th className="px-2">CATEGORY</th>
            <th className="px-2">NOTE</th>
            <th className="px-2">OUTFLOW</th>
            <th className="px-2">INFLOW</th>
            <th className="px-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {newEntry && (
            <NewTransaction
              accountId={account.id ?? null}
              onClose={() => setNewEntry(false)}
            />
          )}
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

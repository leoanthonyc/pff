import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NewTransaction from "./NewTransaction";
import Transaction from "../Transaction";
import useTransactionsQuery from "../../utils/useTransactionsQuery";

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

  const showAccount = useMemo(() => (accountId === "all" ? true : false), [
    transactions,
  ]);

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
            {showAccount && <th className="px-2">ACCOUNT</th>}
            <th className="px-2">PAYEE</th>
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
              showAccount={showAccount}
              onClose={() => setNewEntry(false)}
            />
          )}
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              showAccount={showAccount}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

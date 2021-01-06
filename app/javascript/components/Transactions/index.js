import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NewTransaction from "./NewTransaction";
import Transaction from "../Transaction";
import useTransactionsQuery from "../../utils/useTransactionsQuery";

const Transactions = () => {
  const [newEntry, setNewEntry] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  let { accountId } = useParams();
  const {
    page,
    pageTotal,
    transactions,
    transactionsTotal,
    transactionsError,
    transactionsLoading,
  } = useTransactionsQuery({
    variables: {
      accountId: accountId !== "all" ? accountId : null,
      page: currentPage,
    },
  });

  const account = useMemo(
    () =>
      accountId !== "all"
        ? transactions[0]?.account
        : {
            name: "All",
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
            ${transactionsTotal > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {transactionsTotal}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="py-2">
          <button
            className="border border-transparent hover:border-gray-300 py-0.5 px-2 rounded-md focus:bg-gray-300 focus:outline-none font-medium"
            type="button"
            onClick={() => setNewEntry(true)}
          >
            + New Transaction
          </button>
        </div>
        <div>
          <ul className="flex justify-end">
            <li className="inline-block px-2">
              <button
                type="button"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="text-xl"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array(pageTotal)
              .fill()
              .map((_, i) => {
                return (
                  <li key={i} className="inline-block px-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage(i)}
                      className={
                        currentPage === i ? "text-xl font-bold" : "text-lg"
                      }
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              })}
            <li className="inline-block px-2">
              <button
                type="button"
                disabled={currentPage === pageTotal - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-xl"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200 text-sm">
          <tr>
            <th className="px-2">DATE</th>
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
          <tr>
            <td className="w-full"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

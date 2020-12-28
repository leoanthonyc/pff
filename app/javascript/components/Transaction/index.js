import React from "react";
import TransactionWithAccount from "./TransactionWithAccount";
import TransactionWithoutAccount from "./TransactionWithoutAccount";

const Transaction = ({ transaction, showAccount = true }) => {
  if (showAccount) return <TransactionWithAccount transaction={transaction} />;
  else return <TransactionWithoutAccount transaction={transaction} />;
};

export default Transaction;

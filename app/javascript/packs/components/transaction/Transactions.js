import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../../api/transaction";
import NewTransaction from "./NewTransaction";

const Transaction = ({ transaction }) => {
  const [name, setName] = useState(transaction.name);
  return <div>{name}</div>;
};

const Transactions = () => {
  const { data, error, loading } = useQuery(TRANSACTIONS_QUERY);
  if (error) return <div> Error loading transactions :( </div>;
  if (loading) return <div> Loading transactions ... </div>;
  return (
    <div>
      <NewTransaction />
      {(data.transactions || []).map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;

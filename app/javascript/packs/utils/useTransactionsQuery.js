import { useQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../graphql/Transaction";

const useTransactionsQuery = ({ variables }) => {
  const { data, loading, error } = useQuery(TRANSACTIONS_QUERY, { variables });

  return {
    transactions: data?.transactions ?? [],
    transactionsLoading: loading,
    transactionError: error,
  };
};

export default useTransactionsQuery;

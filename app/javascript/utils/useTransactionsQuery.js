import { useQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../graphql/Transaction";

const useTransactionsQuery = ({ variables }) => {
  const { data, loading, error } = useQuery(TRANSACTIONS_QUERY, {
    variables,
  });

  return {
    page: data?.transactions?.page ?? 0,
    pageTotal: data?.transactions?.pageTotal ?? 0,
    transactions: data?.transactions?.transactions ?? [],
    transactionsTotal: data?.transactions?.transactionsTotal ?? 0,
    transactionsLoading: loading,
    transactionError: error,
  };
};

export default useTransactionsQuery;

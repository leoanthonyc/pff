import { useQuery } from "@apollo/client";

import { ACCOUNTS_QUERY } from "../graphql/Account";

const useAccountsQuery = () => {
  const { data, loading, error } = useQuery(ACCOUNTS_QUERY);
  return {
    accounts: data?.accounts ?? [],
    accountsLoading: loading,
    accountsError: error,
  };
};

export default useAccountsQuery;

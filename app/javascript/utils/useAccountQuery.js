import { useQuery } from "@apollo/client";

import { ACCOUNT_QUERY } from "../graphql/Account";

const useAccountQuery = ({ variables }) => {
  const { data, loading, error } = useQuery(ACCOUNT_QUERY, { variables });
  return {
    account: data?.account ?? undefined,
    accountLoading: loading,
    accountError: error,
  };
};

export default useAccountQuery;

import { useQuery } from "@apollo/client";
import { PAYEES_QUERY } from "../graphql/Payee";

const usePayeesQuery = () => {
  const { data, loading, error } = useQuery(PAYEES_QUERY);
  return {
    payees: data?.payees ?? [],
    payeesLoading: loading,
    payeesError: error,
  };
};

export default usePayeesQuery;

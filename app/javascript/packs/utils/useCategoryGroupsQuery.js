import { useQuery } from "@apollo/client";
import { CATEGORY_GROUPS_QUERY } from "../graphql/CategoryGroup";

const useCategoryGroupsQuery = () => {
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  return {
    categoryGroups: data?.categoryGroups ?? [],
    categoryGroupsLoading: loading,
    categoryGroupsError: error,
  };
};

export default useCategoryGroupsQuery;

import { useQuery } from "@apollo/client";
import { BUDGET_OVERVIEW_QUERY } from "../graphql/BudgetOverview";

const useBudgetOverviewQuery = ({ variables }) => {
  const { data, loading, error } = useQuery(BUDGET_OVERVIEW_QUERY, {
    variables,
  });
  return {
    categoryGroups: data?.budgetOverview.categoryGroups ?? [],
    transactions: data?.budgetOverview.transactions ?? [],
    budgetOverviewLoading: loading,
    budgetOverviewError: error,
  };
};

export default useBudgetOverviewQuery;

import { gql } from "@apollo/client";

export const BUDGET_OVERVIEW_QUERY = gql`
  query BudgetOverview($month: ISO8601Date!) {
    budgetOverview(month: $month) {
      categoryGroups {
        id
        name
        categories {
          id
          name
          goal
        }
      }
      transactions {
        id
        date
        value
        category {
          id
          name
        }
      }
    }
  }
`;

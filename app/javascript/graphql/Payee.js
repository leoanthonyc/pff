import { gql } from "@apollo/client";

export const PAYEES_QUERY = gql`
  query Payees {
    payees {
      id
      name
    }
  }
`;

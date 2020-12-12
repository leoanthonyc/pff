import { gql } from "@apollo/client";

export const ACCOUNTS_QUERY = gql`
  query Accounts {
    accounts {
      id
      name
    }
  }
`;

export const SAVE_ACCOUNT_MUTATION = gql`
  mutation SaveAccount($id: ID, $name: String!) {
    saveAccount(input: { id: $id, name: $name }) {
      account {
        id
        name
      }
    }
  }
`;

export const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(input: { id: $id }) {
      success
    }
  }
`;

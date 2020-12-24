import { gql } from "@apollo/client";

export const ACCOUNTS_QUERY = gql`
  query Accounts {
    accounts {
      id
      name
      value
    }
  }
`;

export const SAVE_ACCOUNT_MUTATION = gql`
  mutation SaveAccount($id: ID, $name: String!, $initialValue: Int) {
    saveAccount(input: { id: $id, name: $name, initialValue: $initialValue }) {
      account {
        id
        name
        value
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

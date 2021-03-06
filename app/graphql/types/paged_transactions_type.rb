# frozen_string_literal: true

module Types
  # gql type for Payee model
  class PagedTransactionsType < Types::BaseObject
    field :page, Integer, null: false
    field :page_total, Integer, null: false
    field :transactions, [TransactionType], null: false
  end
end

# frozen_string_literal: true

module Types
  # Budget Overview GraphQL Type
  class BudgetOverviewType < Types::BaseObject
    field :category_groups, [CategoryGroupType], null: false
    field :transactions, [TransactionType], null: false
  end
end

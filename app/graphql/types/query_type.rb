# frozen_string_literal: true

module Types
  # GraphQL Queries
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
                               description: 'An example field added by the generator'
    def test_field
      'Hello World!'
    end

    field :category_group, Types::CategoryGroupType, null: false do
      argument :id, ID, required: true
    end
    def category_group(id:)
      CategoryGroup.find(id)
    end

    field :category_groups, [Types::CategoryGroupType], null: true
    def category_groups
      CategoryGroup.all.order(created_at: :desc)
    end

    field :category, Types::CategoryType, null: false do
      argument :id, ID, required: true
    end
    def category(id:)
      Category.find(id)
    end

    field :categories, [Types::CategoryType], null: true
    def categories
      Category.all
    end

    field :account, Types::AccountType, null: false do
      argument :id, ID, required: true
    end
    def account(id:)
      Account.find(id)
    end

    field :accounts, [Types::AccountType], null: false
    def accounts
      Account.all.order(created_at: :desc)
    end

    field :transaction, Types::TransactionType, null: false do
      argument :id, ID, required: true
    end
    def transaction(id:)
      Transaction.find(id)
    end

    field :transactions, [Types::TransactionType], null: false do
      argument :account_id, ID, required: false
    end
    def transactions(account_id:)
      if account_id
        Transaction.where(account_id: account_id)
      else
        Transaction.all
      end
    end
  end
end

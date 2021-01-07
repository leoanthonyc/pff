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

    field :budget_overview, Types::BudgetOverviewType, null: false do
      argument :month, GraphQL::Types::ISO8601Date, required: true
    end
    def budget_overview(month:)
      month_start = month
      month_end = month.end_of_month
      {
        category_groups: CategoryGroup.all.order(:created_at),
        transactions: Transaction.where('date >= ? AND date <= ?', month_start, month_end)
      }
    end

    field :category_group, Types::CategoryGroupType, null: false do
      argument :id, ID, required: true
    end
    def category_group(id:)
      CategoryGroup.find(id)
    end

    field :category_groups, [Types::CategoryGroupType], null: true
    def category_groups
      CategoryGroup.all.order(:created_at)
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
      if id == 'all'
        OpenStruct.new.tap do |o|
          o.id = 0
          o.name = 'All Accounts'
          o.transactions = Transaction.all
        end
      else
        Account.find(id)
      end
    end

    field :accounts, [Types::AccountType], null: false
    def accounts
      Account.all.order(:created_at)
    end

    field :transaction, Types::TransactionType, null: false do
      argument :id, ID, required: true
    end
    def transaction(id:)
      Transaction.find(id)
    end

    field :transactions, Types::PagedTransactionsType, null: false do
      argument :account_id, ID, required: false
      argument :page, Integer, required: false
      argument :query, String, required: false
    end
    DEFAULT_TRANSACTIONS_LIMIT = 25
    def transactions(account_id: nil, page: 0, query: '')
      offset = DEFAULT_TRANSACTIONS_LIMIT * page
      transactions = TransactionSearch.new(
        filters: {
          account_id: account_id,
          query: query,
          sort: 'date desc'
        }
      ).results
      {
        page: page,
        page_total: (transactions.size.to_f / DEFAULT_TRANSACTIONS_LIMIT).ceil,
        transactions: transactions
          .offset(offset)
          .limit(DEFAULT_TRANSACTIONS_LIMIT)
      }
    end

    field :payees, [Types::PayeeType], null: false
    def payees
      Payee.all.order(:name)
    end
  end
end

# frozen_string_literal: true

module Mutations
  # Create or update account model
  class SaveAccount < BaseMutation
    null false

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :initial_value, Integer, required: false

    field :account, Types::AccountType, null: false

    def resolve(id: nil, name:, initial_value:)
      account = if id
                  Account.find(id)
                else
                  Account.new
                end
      account.name = name
      account.save!
      if id.nil?
        account.transactions.create!(
          category: Category.not_budgeted,
          payee: Payee.initial_value,
          value: initial_value,
          note: 'Initial Value'
        )
      end
      { account: account }
    end
  end
end

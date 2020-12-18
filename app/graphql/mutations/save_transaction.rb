# frozen_string_literal: true

module Mutations
  # Create or update transaction
  class SaveTransaction < BaseMutation
    null false

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :value, Integer, required: false
    argument :category_id, ID, required: true
    argument :account_id, ID, required: true

    field :transaction, Types::TransactionType, null: false

    def resolve(id: nil, name:, value: 0, category_id:, account_id:)
      transaction = if id
                      Transaction.find(id)
                    else
                      Transaction.new
                    end
      transaction.name = name
      transaction.value = value
      transaction.category = Category.find(category_id)
      transaction.account = Account.find(account_id)
      transaction.save!
      { transaction: transaction }
    end
  end
end

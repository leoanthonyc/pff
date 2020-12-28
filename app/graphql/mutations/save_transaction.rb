# frozen_string_literal: true

module Mutations
  # Create or update transaction
  class SaveTransaction < BaseMutation
    null false

    argument :id, ID, required: false
    argument :payee, String, required: true
    argument :value, Integer, required: false
    argument :category_id, ID, required: true
    argument :account_id, ID, required: true
    argument :note, String, required: false

    field :transaction, Types::TransactionType, null: false

    def resolve(id: nil, payee:, value: 0, category_id:, account_id:, note: '')
      transaction = Transaction.find_or_create_by(id: id)
      transaction.payee = find_payee(payee)
      transaction.value = value
      transaction.category = Category.find(category_id)
      transaction.account = Account.find(account_id)
      transaction.note = note
      transaction.save!
      { transaction: transaction }
    end

    private

    def find_payee(payee_str)
      Payee.find_or_create_by(name: payee_str)
    end
  end
end

# frozen_string_literal: true

module Mutations
  # Create or update transaction
  class SaveTransaction < BaseMutation
    null false

    argument :id, ID, required: false
    argument :date, GraphQL::Types::ISO8601Date, required: true
    argument :payee, String, required: true
    argument :value, Integer, required: false
    argument :category_id, ID, required: true
    argument :account_id, ID, required: true
    argument :note, String, required: false

    field :transaction, Types::TransactionType, null: false

    def resolve(id: nil, date:, payee:, value: 0, category_id:, account_id:, note: '')
      transaction = Transaction.find_or_create_by(id: id)
      transaction.date = normalize_date(date)
      transaction.payee = find_payee(payee)
      transaction.value = value
      transaction.category = Category.find(category_id)
      transaction.account = Account.find(account_id)
      transaction.note = note
      transaction.save!
      { transaction: transaction }
    end

    private

    def normalize_date(d)
      t = Time.now
      DateTime.new(d.year, d.month, d.day, t.hour, t.min, t.sec, t.zone)
    end

    def find_payee(payee_str)
      Payee.find_or_create_by(name: payee_str)
    end
  end
end

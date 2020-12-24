# frozen_string_literal: true

# model for transactions
class Transaction < ApplicationRecord
  belongs_to :category
  belongs_to :account
  belongs_to :payee, optional: true
end

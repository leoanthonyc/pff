# frozen_string_literal: true

# Category model
class Category < ApplicationRecord
  belongs_to :category_group, optional: true

  NOT_BUDGETED = 'Not Budgeted'

  def self.not_budgeted
    where(name: NOT_BUDGETED).first
  end
end

# frozen_string_literal: true

# CategoryGroup model
class CategoryGroup < ApplicationRecord
  has_many :categories, dependent: :destroy
end

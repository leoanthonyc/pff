# frozen_string_literal: true

# Category model
class Category < ApplicationRecord
  belongs_to :category_group
end

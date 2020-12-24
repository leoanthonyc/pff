# frozen_string_literal: true

module Types
  # gql type for Category model
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :goal, Integer, null: false
    field :category_group, Types::CategoryGroupType, null: false

    field :remaining, Integer, null: false

    def remaining
      month_start = Date.current.beginning_of_month
      month_end = month_start.end_of_month
      total_spent = Transaction
                    .where(category: object)
                    .where('created_at >= ? AND created_at < ?', month_start, month_end)
                    .pluck(:value)
                    .sum
      object.goal + total_spent
    end
  end
end

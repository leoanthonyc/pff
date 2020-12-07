# frozen_string_literal: true

module Types
  # gql type for CategoryGroup model
  class CategoryGroupType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
  end
end

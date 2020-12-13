# frozen_string_literal: true

module Types
  # Mutations
  class MutationType < Types::BaseObject
    field :save_category_group, mutation: Mutations::SaveCategoryGroup
    field :save_category, mutation: Mutations::SaveCategory
    field :save_account, mutation: Mutations::SaveAccount
    field :save_transaction, mutation: Mutations::SaveTransaction

    field :delete_category_group, mutation: Mutations::DeleteCategoryGroup
    field :delete_category, mutation: Mutations::DeleteCategory
    field :delete_account, mutation: Mutations::DeleteAccount
  end
end

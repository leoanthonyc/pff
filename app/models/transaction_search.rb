# frozen_string_literal: true

# Transaction SearchObject
class TransactionSearch
  include SearchObject.module(:sorting)

  scope { Transaction.all }

  option(:account_id) { |scope, value| value ? scope.where(account_id: value) : scope }

  option(:query) do |scope, value|
    if value
      scope
        .joins(:payee)
        .joins(:category)
        .where("payees.name LIKE '%#{value}%' OR categories.name LIKE '%#{value}%'")
    else
      scope
    end
  end

  option(:offset) { |scope, value| scope.offset(value) }
  option(:limit) { |scope, value| scope.limit(value) }

  sort_by :date
end

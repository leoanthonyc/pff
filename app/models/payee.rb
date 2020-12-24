# frozen_string_literal: true

class Payee < ApplicationRecord
  INITIAL_VALUE = 'Initial Value'

  def self.initial_value
    where(name: INITIAL_VALUE).first
  end
end

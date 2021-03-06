class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.belongs_to :category, null: false, foreign_key: true
      t.belongs_to :account, null: false, foreign_key: true
      t.belongs_to :payee, null: true, foreign_key: true
      t.integer :value, default: 0
      t.text :note
      t.datetime :date, null: false

      t.timestamps
    end
  end
end

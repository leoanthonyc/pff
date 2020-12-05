class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :name
      t.belongs_to :category, null: false, foreign_key: true
      t.belongs_to :account, null: false, foreign_key: true
      t.integer :value
      t.text :note

      t.timestamps
    end
  end
end

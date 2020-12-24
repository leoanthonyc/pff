class CreatePayees < ActiveRecord::Migration[6.0]
  def change
    create_table :payees do |t|
      t.string :name

      t.timestamps
    end

    Payee.create(name: 'Initial Value')
  end
end

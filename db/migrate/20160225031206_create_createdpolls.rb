class CreateCreatedpolls < ActiveRecord::Migration
  def change
    create_table :createdpolls do |t|
      t.string :gender
      t.integer :age
      t.integer :option1_votes
      t.integer :option2_votes
      t.integer :zipcode

      t.timestamps null: false
    end
  end
end

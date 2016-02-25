class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.text :poll
      t.integer :total_votes
      t.date :date_closed

      t.timestamps null: false
    end
  end
end

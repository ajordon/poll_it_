class ChangeCreatedpollsToVotes < ActiveRecord::Migration
  def change
    rename_table :createdpolls, :votes
    add_column :votes, :user_id, :integer
    add_foreign_key  :votes, :users, column: :user_id
    add_index :votes, :user_id
  end
end

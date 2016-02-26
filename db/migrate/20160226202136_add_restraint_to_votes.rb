class AddRestraintToVotes < ActiveRecord::Migration
  def change
    add_index :votes, [:user_id, :poll_id], :unique => true
  end
end

class RemoveUserIdFromPoll < ActiveRecord::Migration
  def change
    remove_column :polls, :user_id
  end
end

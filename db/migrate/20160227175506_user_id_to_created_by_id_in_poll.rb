class UserIdToCreatedByIdInPoll < ActiveRecord::Migration
  def change
    rename_column :polls, :created_by, :created_by_id
  end
end

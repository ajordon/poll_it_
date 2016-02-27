class RenameCreatedByIdInPoll < ActiveRecord::Migration
  def change
    rename_column :polls, :created_by_id, :created_by
  end
end

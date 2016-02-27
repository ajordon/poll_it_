class AddColumnCreatedByToPoll < ActiveRecord::Migration
  def change
    add_column :polls, :created_by, :integer
  end
end

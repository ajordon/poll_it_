class AddFKeyUserToPoll < ActiveRecord::Migration
  def change
    add_foreign_key :polls, :users, column: :created_by_id
  end
end

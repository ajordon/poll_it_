class ChangeColumnPollToQuestion < ActiveRecord::Migration
  def change
    rename_column :polls, :poll, :question
  end
end

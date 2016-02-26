class RemoveTotalVotesFromPoll < ActiveRecord::Migration
  def change
    remove_column :polls, :total_votes
  end
end

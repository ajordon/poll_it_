class RemoveOptionVotesFromVotes < ActiveRecord::Migration
  def change
    remove_column :votes, :option1_votes
    remove_column :votes, :option2_votes
  end
end

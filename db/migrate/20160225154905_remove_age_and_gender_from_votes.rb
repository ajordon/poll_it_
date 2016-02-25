class RemoveAgeAndGenderFromVotes < ActiveRecord::Migration
  def change
    remove_column :votes, :age
    remove_column :votes, :gender
  end
end

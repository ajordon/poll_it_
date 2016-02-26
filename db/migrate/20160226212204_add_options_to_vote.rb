class AddOptionsToVote < ActiveRecord::Migration
  def change
    add_reference :votes, :option, index: true, foreign_key: true
  end
end

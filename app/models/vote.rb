class Vote < ActiveRecord::Base
  belongs_to :poll, inverse_of: :votes
  belongs_to :user, inverse_of: :votes

  validates :user_id, uniqueness: true
end

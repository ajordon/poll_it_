class Vote < ActiveRecord::Base
  belongs_to :polls, inverse_of: :poll_id
  belongs_to :users, inverse_of: :user_id

  validates :user_id, uniqueness: true
end

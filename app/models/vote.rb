class Vote < ActiveRecord::Base
  has_many :users
  belongs_to :polls, inverse_of: :poll_id

  validates :user_id, uniqueness: true
end

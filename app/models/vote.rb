class Vote < ActiveRecord::Base
  belongs_to :poll, inverse_of: :votes
  belongs_to :user, inverse_of: :votes
  has_many :options, through: :polls

  validates :user_id, uniqueness: true
end

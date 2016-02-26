class Vote < ActiveRecord::Base
  belongs_to :poll, inverse_of: :poll_id
  belongs_to :user, inverse_of: :user_id

  validates :user_id, uniqueness: true
end

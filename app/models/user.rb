#
class User < ActiveRecord::Base
  include Authentication
  has_many :polls, inverse_of: :user
  has_many :votes
end

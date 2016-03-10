#
class User < ActiveRecord::Base
  include Authentication
  has_many :polls, inverse_of: :created_by, foreign_key: 'created_by',
  class_name: 'Poll'
  has_many :votes
  has_one :vote, through: :poll
end

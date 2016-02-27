#
class User < ActiveRecord::Base
  include Authentication
  has_many :polls, inverse_of: :created_by, foreign_key: 'created_by_id',
  class_name: 'Poll'
  has_many :votes
end

class Poll < ActiveRecord::Base
  has_many :votes
  has_many :options
  belongs_to :created_by, inverse_of: :polls, class_name: 'User', foreign_key: :created_by
end

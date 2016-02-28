class Poll < ActiveRecord::Base
  has_many :votes
  has_many :options
  belongs_to :created_by, inverse_of: :polls, class_name: 'User'
end

class Option < ActiveRecord::Base
  belongs_to :poll
  has_many :votes, through: :polls 
end

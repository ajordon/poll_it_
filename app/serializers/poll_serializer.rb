class PollSerializer < ActiveModel::Serializer
  attributes :id, :question, :date_closed, :created_by
  has_many :options
  has_many :votes
end

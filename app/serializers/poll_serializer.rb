class PollSerializer < ActiveModel::Serializer
  attributes :question, :date_closed
  has_one :created_by

end

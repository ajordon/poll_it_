class PollSerializer < ActiveModel::Serializer
  attributes :id, :question, :date_closed, :created_by
end

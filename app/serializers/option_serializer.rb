class OptionSerializer < ActiveModel::Serializer
  attributes :id, :response
  has_one :poll
end

#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :poll_id, :option_id
end

#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :age, :gender
end

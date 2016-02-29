class PollsController < ProtectedController
  before_action :set_user, only: [:create]
  skip_before_action :authenticate, only: [:index, :show, :update]

  def index
    render json: Poll.all
  end

  def show
    poll = Poll.find(params[:id])
    render json: poll
  end

  def create
    @poll = if current_user
      current_user.polls.build(poll_params)
    else
      Poll.new(poll_params)
    end

    if @poll.save
      render json: @poll, status: :created
    else
      rencer json: @poll.errors, status: :unprocessable_entity
    end
  end

#   def update
#     @poll = Poll.find(params[:id])
#
#     if @poll.update(poll_params)
#       head :no_content
#     else
#       render json: @poll.errors, status: :unprocessable_entity
#     end
#   end
#
#   def destroy
#     @poll.destroy
#     head :no_content
#   end
#
# private
#   def set_poll
#     @poll = Poll.find(params[:id])
#   end
#
  def set_user
    @user = User.find(params[:user_id])
  end
#
#   def poll_params
#     params.require(:poll).permit(:question)
#   end
end

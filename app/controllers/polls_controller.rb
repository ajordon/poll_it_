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

  def update
    @poll = if current_user
      current_user.poll.find(params[:id])
    else
      Poll.find(params[:id])
    end

    if @poll.update(poll_params)
      head :no_content
    else
      render json: @poll.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @poll = if current_user
      current_user.poll.find(params[:id])
      @poll.destroy
      head :no_content
    else
      render json: @poll.errors, status: :unprocessable_entity
    end
  end

private
  def set_poll
    @poll = if current_user
      current_user.poll.find(params[:id])
    else
      Poll.find(params[:id])
    end
  end

  def set_user
    @user = = if current_user
      current_user.poll.find(params[:id])
    else
      User.find(params[:user_id])
    end
  end

  def poll_params
    params.require(:poll).permit(:question)
  end
end

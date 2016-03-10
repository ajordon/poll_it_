class PollsController < ProtectedController
  # before_action :set_option, only: [:show]
  skip_before_action :authenticate, only: [:index, :show, :create]

  def index
    @polls = if params[:search_key].present?
      Poll.search_by_key(params[:search_key])
    elsif params[:search_user].present?
        Poll.search_by_user(params[:search_user])
    else
      Poll.all
    end

    render json: @polls
  end

  def show
    @poll = if current_user
      current_user.polls.find([:created_by])
    else
      Poll.find(params[:id])
    end

    render json: @poll
  end

  def create
    @poll = Poll.new(poll_params)
    @poll.options.new(option1_params)
    @poll.options.new(option2_params)

    if (get_user)
      @poll.created_by = get_user
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
    @poll = current_user.polls.find(params[:id])
    if @poll
      @poll.destroy
      head :no_content
    else
      render json: @poll.errors, status: :unprocessable_entity
    end
  end

private
  def set_poll
    @poll = if current_user
      current_user.poll.find(params[:created_by])
    else
      Poll.find(params[:id])
    end
  end

  def get_user
    User.find_by token: request.headers["HTTP_AUTHORIZATION"].split('=')[-1]
  end
  # def set_option
  #   Options.find(params[:poll_id])
  # end

  def option1_params
    params.require(:option1).permit(:response, :poll_id)
  end

  def option2_params
    params.require(:option2).permit(:response, :poll_id)
  end

  def poll_params
    params.require(:poll).permit(:question, :created_by)
  end
end

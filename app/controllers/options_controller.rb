class OptionsController < ApplicationController
  before_filter :set_option, only: [:destroy, :create]
  before_filter :set_poll, only: [:index, :show, :create]

  def create
    @option = Option.new(option_params)
    @option.poll = @poll

    if @option.save
      render json: @option, status: :created
    else
      render json: @option.errors, status: :unprocessable_entity
    end
  end

  # /polls/:poll_id/options
  def index
    @options = @poll.options
    render json: @options
  end

  def show
    @option = @poll.options.poll.find(params[:id])
    render json: @option
  end

  def destroy
    @option.destroy
    head :no_content
  end

  private
    def set_poll
      @poll = Poll.find(params[:poll_id])
    end

    def set_option
      @option = Option.find(params[:id])
    end

    def vote_params
      params.require(:option).permit(:response, :poll_id)
    end
end

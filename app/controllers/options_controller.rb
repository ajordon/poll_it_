class OptionsController < ApplicationController
  before_filter :set_option, only: [:index]
  before_filter :set_poll, only: [:index, :create]

  def create
    @option = Option.new(option_params)
    @option.poll = @poll

    if @option.save
      render json: @option, status: :created
    else
      render json: @option.errors, status: :unprocessable_entity
    end
  end

  def index
    @option = @poll.options
    render json: @option
  end

  private
    def set_poll
      @poll = poll.find(params[:id])
    end

    def set_option
      @option = Option.find(params[:id])
    end

    def vote_params
      params.require(:option).permit(:response, :poll_id)
    end
end

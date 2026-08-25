class MuralController < ApplicationController
  before_action :authenticate_user!

  def index
    @mural_messages = MuralMessage.includes(:user).recent.reverse
    @mural_message = MuralMessage.new
    @online_users = User.online.where.not(id: current_user.id)
  end
end
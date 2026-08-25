class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = params[:id] ? User.find_by(id: params[:id]) : current_user
    @user ||= current_user
    @posts = @user.posts.recent
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(profile_params)
      flash[:notice] = "Perfil atualizado!"
      redirect_to profile_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def toggle_online
    current_user.update(
      online_now: params[:online_now] == "true" || params[:online_now] == true || params[:online_now] == "1",
      radius_meters: params[:radius_meters] || current_user.radius_meters
    )
    render json: { status: "ok", online_now: current_user.online_now, radius_meters: current_user.radius_meters }
  end

  private

  def profile_params
    params.require(:user).permit(:name, :bio, :avatar_url, :intentions, :radius_meters, :birthdate)
  end
end
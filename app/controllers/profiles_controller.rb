class ProfilesController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }
  before_action :set_user

  def show
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json do
        render json: user_json(@user)
      end
    end
  end

  def edit
  end

  def update
    permitted = profile_params
    
    # Process preferences if supplied as object or JSON string
    if params[:preferences].present?
      prefs = params[:preferences]
      prefs = JSON.parse(prefs) if prefs.is_a?(String)
      @user.preferences = (@user.preferences || {}).merge(prefs.is_a?(ActionController::Parameters) ? prefs.to_unsafe_h : prefs)
    end

    if params[:user].is_a?(ActionController::Parameters) && params[:user][:preferences].present?
      prefs = params[:user][:preferences]
      prefs = JSON.parse(prefs) if prefs.is_a?(String)
      @user.preferences = (@user.preferences || {}).merge(prefs.is_a?(ActionController::Parameters) ? prefs.to_unsafe_h : prefs)
    end

    # Also handle individual convenience parameters if present
    @user.sou = params[:sou] if params[:sou].present?
    @user.acompanhado = params[:acompanhado] if params[:acompanhado].present?
    @user.procuro = params[:procuro] if params[:procuro].present?

    if @user.update(permitted.except(:preferences))
      respond_to do |format|
        format.html do
          flash[:notice] = "Perfil atualizado com sucesso!"
          redirect_to root_path
        end
        format.json do
          render json: {
            success: true,
            message: "Perfil atualizado com sucesso!",
            user: user_json(@user)
          }
        end
      end
    else
      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: { success: false, errors: @user.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def toggle_online
    @user.update(
      online_now: params[:online_now] == "true" || params[:online_now] == true || params[:online_now] == "1",
      radius_meters: params[:radius_meters] || @user.radius_meters
    )
    render json: { status: "ok", online_now: @user.online_now, radius_meters: @user.radius_meters }
  end

  private

  def set_user
    @user = current_user || (params[:id] ? User.find_by(id: params[:id]) : nil) || User.first
    unless @user
      respond_to do |format|
        format.html { redirect_to root_path, alert: "Faça login para continuar" }
        format.json { render json: { success: false, message: "Usuário não encontrado." }, status: :unauthorized }
      end
    end
  end

  def profile_params
    if params[:user].present? && params[:user].is_a?(ActionController::Parameters)
      params.require(:user).permit(:name, :bio, :avatar_url, :intentions, :radius_meters, :birthdate, :vibe)
    else
      params.permit(:name, :bio, :avatar_url, :intentions, :radius_meters, :birthdate, :vibe)
    end
  end

  def user_json(u)
    {
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.display_avatar,
      verified: u.verified?,
      isVerified: u.verified?,
      bio: u.bio,
      intent: u.intentions,
      vibe: u.vibe,
      preferences: u.preferences || {},
      sou: u.sou,
      acompanhado: u.acompanhado,
      procuro: u.procuro
    }
  end
end
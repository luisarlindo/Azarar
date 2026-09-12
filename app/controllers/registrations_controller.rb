class RegistrationsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      cookies.encrypted[:user_id] = @user.id
      @user.update(online_now: true)

      respond_to do |format|
        format.html do
          flash[:notice] = "Conta criada com sucesso! Bem-vindo(a) ao Azarar."
          redirect_to root_path
        end
        format.json do
          render json: {
            success: true,
            user: {
              id: @user.id,
              name: @user.name,
              username: @user.username,
              avatar: @user.display_avatar,
              verified: @user.verified?,
              isVerified: @user.verified?,
              is_verified: @user.verified?,
              bio: @user.bio,
              intent: @user.intentions || "Relacionamento Sério",
              vibe: @user.vibe || "🍹 No balcão do bar"
            }
          }, status: :created
        end
      end
    else
      respond_to do |format|
        format.html do
          flash[:alert] = @user.errors.full_messages.join(", ")
          redirect_to root_path
        end
        format.json do
          render json: { success: false, message: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
      end
    end
  end

  private

  def user_params
    u_params = params[:user].presence || params
    u_params.permit(:name, :birthdate, :username, :email_or_phone, :password, :password_confirmation, :intentions, :bio, :vibe)
  end
end

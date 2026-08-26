class SessionsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  def create
    identifier = params[:identifier].to_s.strip.downcase.gsub(/^@/, "")
    user = User.where("lower(username) = ? OR lower(email_or_phone) = ?", identifier, identifier).first

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      user.update(online_now: true)

      respond_to do |format|
        format.html do
          flash[:notice] = "Bem-vindo(a) de volta, #{user.name}!"
          redirect_to root_path
        end
        format.json do
          render json: {
            success: true,
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              avatar: user.display_avatar,
              verified: user.verified?,
              bio: user.bio,
              intent: user.intentions || "Relacionamento Sério",
              vibe: user.vibe || "🍹 No balcão do bar"
            }
          }
        end
      end
    else
      respond_to do |format|
        format.html do
          flash[:alert] = "E-mail, usuário ou senha incorretos."
          redirect_to root_path
        end
        format.json do
          render json: { success: false, message: "E-mail, usuário ou senha incorretos." }, status: :unauthorized
        end
      end
    end
  end

  def face_login
    identifier = params[:identifier].to_s.strip.downcase.gsub(/^@/, "")
    captured_image = params[:captured_image] || params[:image]

    user = if identifier.present?
      User.where("lower(username) = ? OR lower(email_or_phone) = ?", identifier, identifier).first
    else
      current_user || User.verified_users.first
    end

    if user.nil?
      render json: {
        success: false,
        error_type: "user_not_found",
        message: "Usuário não encontrado. Por favor, cadastre-se ou entre com seu e-mail/senha."
      }, status: :not_found
      return
    end

    # Check if user has biometric enrollment
    unless user.verified?
      render json: {
        success: false,
        error_type: "not_enrolled",
        message: "O usuário #{user.name} ainda não cadastrou o reconhecimento facial. Entre com sua senha tradicional e ative a verificação facial no seu perfil."
      }, status: :unprocessable_entity
      return
    end

    if captured_image.blank?
      render json: {
        success: false,
        error_type: "image_missing",
        message: "Nenhuma imagem capturada da câmera."
      }, status: :unprocessable_entity
      return
    end

    # Execute biometric verification against stored face
    service = FaceRecognitionService.new(user, captured_image)
    result = service.verify!

    if result.success?
      session[:user_id] = user.id
      user.update(online_now: true)

      render json: {
        success: true,
        authenticated: true,
        similarity: result.similarity,
        message: "🎉 Reconhecimento facial aprovado (#{result.similarity}%)! Bem-vindo(a) de volta, #{user.name.split(' ').first}!",
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.display_avatar,
          verified: true,
          bio: user.bio,
          intent: user.intentions || "Relacionamento Sério",
          vibe: user.vibe || "🍹 No balcão do bar"
        }
      }, status: :ok
    else
      render json: {
        success: false,
        authenticated: false,
        similarity: result.similarity,
        error_type: "biometric_mismatch",
        message: "❌ Rosto não reconhecido. Tente com boa iluminação ou entre com sua senha."
      }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      current_user.update(online_now: false)
    end
    session[:user_id] = nil
    flash[:notice] = "Você saiu da sua conta."
    redirect_to root_path
  end
end
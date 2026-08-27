class SessionsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  def create
    identifier = params[:identifier].to_s.strip.downcase.gsub(/^@/, "")
    user = User.where("lower(username) = ? OR lower(email_or_phone) = ?", identifier, identifier).first

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      cookies.encrypted[:user_id] = user.id
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
              isVerified: user.verified?,
              is_verified: user.verified?,
              faceSimilarityScore: user.face_similarity_score || 98.8,
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
    captured_image = params[:captured_image] || params[:image]

    if captured_image.blank?
      render json: {
        success: false,
        error_type: "image_missing",
        message: "Nenhuma imagem capturada da câmera."
      }, status: :unprocessable_entity
      return
    end

    verified_candidates = User.verified_users

    if verified_candidates.empty?
      render json: {
        success: false,
        error_type: "not_enrolled",
        message: "Nenhum usuário com biometria cadastrada no sistema. Faça o login tradicional com sua senha e ative o Selo de Verificação Facial no seu perfil."
      }, status: :unprocessable_entity
      return
    end

    # If identifier was optionally passed, filter to that user
    if params[:identifier].present?
      ident = params[:identifier].to_s.strip.downcase.gsub(/^@/, "")
      specific_user = User.where("lower(username) = ? OR lower(email_or_phone) = ?", ident, ident).first
      if specific_user
        unless specific_user.verified?
          render json: {
            success: false,
            error_type: "not_enrolled",
            message: "O usuário #{specific_user.name} ainda não possui biometria facial cadastrada. Entre com sua senha tradicional."
          }, status: :unprocessable_entity
          return
        end
        verified_candidates = [specific_user]
      end
    end

    # Biometric identification (1:N search)
    best_match = nil
    highest_score = 0.0

    verified_candidates.each do |candidate|
      service = FaceRecognitionService.new(candidate, captured_image)
      result = service.verify!
      if result.success? && result.similarity > highest_score
        highest_score = result.similarity
        best_match = candidate
      end
      break if highest_score >= 95.0 # Early-exit optimization
    end

    if best_match && highest_score >= 85.0
      session[:user_id] = best_match.id
      cookies.encrypted[:user_id] = best_match.id
      best_match.update(online_now: true)

      render json: {
        success: true,
        authenticated: true,
        similarity: highest_score,
        message: "🎉 Reconhecimento facial aprovado (#{highest_score}%)! Bem-vindo(a) de volta, #{best_match.name.split(' ').first}!",
        user: {
          id: best_match.id,
          name: best_match.name,
          username: best_match.username,
          avatar: best_match.display_avatar,
          verified: true,
          isVerified: true,
          is_verified: true,
          faceSimilarityScore: highest_score,
          bio: best_match.bio,
          intent: best_match.intentions || "Relacionamento Sério",
          vibe: best_match.vibe || "🍹 No balcão do bar"
        }
      }, status: :ok
    else
      render json: {
        success: false,
        authenticated: false,
        error_type: "biometric_mismatch",
        message: "❌ Rosto não reconhecido entre os usuários cadastrados. Tente novamente com boa iluminação ou entre com sua senha."
      }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      current_user.update(online_now: false)
    end
    session[:user_id] = nil
    cookies.delete(:user_id)
    flash[:notice] = "Você saiu da sua conta."
    redirect_to root_path
  end
end
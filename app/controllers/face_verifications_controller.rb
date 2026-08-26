# frozen_string_literal: true

class FaceVerificationsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  def create
    # Resolve target user from session or params
    user = current_user || User.find_by(id: params[:user_id]) || User.find_by(username: params[:username]) || User.first

    captured_image = params[:captured_image] || params[:image]

    if captured_image.blank?
      render json: { success: false, message: "Imagem facial não fornecida." }, status: :unprocessable_entity
      return
    end

    service = FaceRecognitionService.new(user, captured_image)
    result = service.verify!

    if result.success?
      render json: {
        success: true,
        verified: true,
        similarity: result.similarity,
        liveness_passed: result.liveness_passed,
        verified_at: result.verified_at,
        message: result.message,
        user: {
          id: user&.id,
          name: user&.name,
          username: user&.username,
          verified: true,
          isVerified: true,
          is_verified: true,
          faceSimilarityScore: result.similarity,
          face_similarity_score: result.similarity
        }
      }, status: :ok
    else
      render json: {
        success: false,
        verified: false,
        similarity: result.similarity,
        message: result.message
      }, status: :unprocessable_entity
    end
  end

  def destroy
    user = current_user || User.find_by(id: params[:user_id]) || User.first
    user&.reset_verification!

    render json: {
      success: true,
      verified: false,
      message: "Verificação facial resetada com sucesso no banco de dados."
    }, status: :ok
  end
end

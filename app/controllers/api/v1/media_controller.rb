module Api
  module V1
    class MediaController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        uploaded_file = params[:file]
        data_url = params[:data_url] || params[:dataUrl]
        media_type = params[:type].to_s

        blob = nil

        if uploaded_file.present? && (uploaded_file.is_a?(ActionDispatch::Http::UploadedFile) || uploaded_file.is_a?(Rack::Test::UploadedFile))
          blob = ActiveStorage::Blob.create_and_upload!(
            io: uploaded_file.tempfile,
            filename: uploaded_file.original_filename,
            content_type: uploaded_file.content_type
          )
        elsif data_url.present? && data_url.is_a?(String) && data_url.start_with?("data:")
          content_type = data_url[/data:(.*?);base64,/, 1] || "image/jpeg"
          ext = content_type.split("/").last.presence || "jpg"
          ext = "jpg" if ext == "jpeg"
          base64_data = data_url.sub(/data:.*?;base64,/, "")
          decoded_data = Base64.decode64(base64_data)
          filename = params[:filename].presence || "media_#{Time.current.to_i}_#{rand(1000)}.#{ext}"

          blob = ActiveStorage::Blob.create_and_upload!(
            io: StringIO.new(decoded_data),
            filename: filename,
            content_type: content_type
          )
        end

        unless blob
          return render json: { success: false, error: "Nenhum arquivo ou data_url válido enviado." }, status: :unprocessable_entity
        end

        url = Rails.application.routes.url_helpers.rails_blob_path(blob, only_path: true)

        user = current_user || User.first
        if media_type == "avatar" && user
          user.avatar_image.attach(blob)
          user.update(avatar_url: url)
        end

        render json: {
          success: true,
          status: "success",
          url: url,
          blob_id: blob.id,
          signed_id: blob.signed_id,
          filename: blob.filename.to_s,
          byte_size: blob.byte_size,
          content_type: blob.content_type
        }
      rescue => e
        render json: { success: false, error: e.message }, status: :internal_server_error
      end
    end
  end
end

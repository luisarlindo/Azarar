module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if verified_user = User.find_by(id: cookies.encrypted[:user_id] || session_user_id)
        verified_user
      else
        reject_unauthorized_connection
      end
    end

    def session_user_id
      session_key = Rails.application.config.session_options[:key] || "_azarar_session"
      cookies.encrypted[session_key]&.dig("user_id")
    rescue StandardError
      nil
    end
  end
end

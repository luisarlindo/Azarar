# frozen_string_literal: true

class LocationsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  def update
    user = current_user || User.find_by(id: params[:user_id]) || User.first
    lat = params[:latitude].to_f
    lng = params[:longitude].to_f
    radius = (params[:radius_meters] || params[:radius] || user&.radius_meters || 500).to_i.clamp(5, 2000)

    if lat.nonzero? && lng.nonzero? && user
      user.update(latitude: lat, longitude: lng, radius_meters: radius, online_now: true)
    elsif user && params[:radius_meters].present?
      user.update(radius_meters: radius)
    end

    render json: {
      success: true,
      latitude: user&.latitude,
      longitude: user&.longitude,
      radius_meters: user&.radius_meters || radius,
      online_now: user&.online_now
    }
  end

  def update_radius
    user = current_user || User.find_by(id: params[:user_id]) || User.first
    radius = params[:radius_meters].to_i.clamp(5, 2000)
    user&.update(radius_meters: radius)

    render json: { success: true, radius_meters: radius }
  end

  def nearby
    user = current_user || User.find_by(id: params[:user_id]) || User.first
    radius = (params[:radius] || params[:radius_meters] || user&.radius_meters || 500).to_i.clamp(5, 2000)
    user_lat = params[:latitude].present? ? params[:latitude].to_f : user&.latitude
    user_lng = params[:longitude].present? ? params[:longitude].to_f : user&.longitude

    users = User.online.where.not(id: user&.id)

    nearby_list = users.map do |u|
      dist = if user_lat && user_lng && u.latitude && u.longitude
               (Geocoder::Calculations.distance_between([user_lat, user_lng], [u.latitude, u.longitude], units: :km) * 1000.0).round
             else
               u.radius_meters || 250
             end

      {
        id: u.id,
        name: u.name,
        username: u.username,
        avatar: u.display_avatar,
        vibe: u.vibe || "🍹 No balcão do bar",
        intent: u.intentions || "Relacionamento Sério",
        distance_meters: dist,
        distance_label: dist >= 1000 ? "#{(dist / 1000.0).round(1)} km" : "#{dist}m",
        verified: u.verified?,
        online: u.online_now?
      }
    end.select { |item| item[:distance_meters] <= radius }.sort_by { |item| item[:distance_meters] }

    render json: {
      success: true,
      radius_meters: radius,
      count: nearby_list.size,
      users: nearby_list
    }
  end
end

# frozen_string_literal: true

class LocationsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }

  def update
    user = current_user || User.find_by(id: params[:user_id]) || User.first
    lat = params[:latitude].to_f
    lng = params[:longitude].to_f
    radius = (params[:radius_meters] || params[:radius] || user&.radius_meters || 5000).to_i.clamp(5, 100_000)

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
    radius = params[:radius_meters].to_i.clamp(5, 100_000)
    user&.update(radius_meters: radius)

    render json: { success: true, radius_meters: radius }
  end

  def nearby
    user = current_user || User.find_by(id: params[:user_id]) || User.first
    radius = (params[:radius] || params[:radius_meters] || user&.radius_meters || 5000).to_i.clamp(5, 100_000)
    user_lat = params[:latitude].present? ? params[:latitude].to_f : user&.latitude
    user_lng = params[:longitude].present? ? params[:longitude].to_f : user&.longitude

    # Calculate real distances to online users
    users = User.online.where.not(id: user&.id)
    nearby_users = users.map do |u|
      dist = if user_lat && user_lng && u.latitude && u.longitude
               (Geocoder::Calculations.distance_between([user_lat, user_lng], [u.latitude, u.longitude], units: :km) * 1000.0).round
             else
               nil
             end

      # Skip if beyond selected radius (when coordinates are available)
      next if dist && dist > radius

      display_dist = dist || (u.radius_meters || 350)
      {
        id: u.id,
        name: u.name,
        username: u.formatted_username,
        avatar: u.display_avatar,
        age: u.age || 24,
        bio: u.bio,
        vibe: u.vibe || "🍹 No balcão do bar",
        intent: u.intentions || "Relacionamento Sério",
        distance_meters: display_dist,
        distance_label: display_dist >= 1000 ? "#{(display_dist / 1000.0).round(1).to_s.tr('.', ',')} km" : "#{display_dist} m",
        verified: u.verified?,
        online: u.online_now?,
        current_venue_id: u.current_venue_id,
        current_venue_name: u.current_venue&.name
      }
    end.compact.sort_by { |item| item[:distance_meters] }

    # Calculate real distances to registered venues
    venues = Venue.visible_in_app.map do |v|
      dist = if user_lat && user_lng && v.latitude && v.longitude
               (Geocoder::Calculations.distance_between([user_lat, user_lng], [v.latitude, v.longitude], units: :km) * 1000.0).round
             else
               v.stars_tier * 300
             end

      {
        id: v.id,
        name: v.name,
        slug: v.slug,
        category: v.category,
        category_label: v.formatted_category,
        address: v.address,
        neighborhood: v.neighborhood,
        city: v.city,
        state: v.state,
        latitude: v.latitude,
        longitude: v.longitude,
        is_partner: v.is_partner,
        partner_tier: v.partner_tier,
        stars_tier: v.stars_tier,
        cover_image_url: v.cover_image_url,
        distance_meters: dist,
        distance_label: dist >= 1000 ? "#{(dist / 1000.0).round(1).to_s.tr('.', ',')} km" : "#{dist} m",
        checkins_count: v.checkins_count,
        active_users_count: v.active_users_count,
        perk_title: v.perk_title
      }
    end.select { |item| item[:distance_meters] <= [radius, 50_000].max }.sort_by { |item| [item[:is_partner] ? 0 : 1, item[:distance_meters]] }

    # Proximity check-in detection: venue within 150m
    closest = venues.select { |v| v[:distance_meters] <= 150 }.min_by { |v| v[:distance_meters] }
    closest_venue = if closest
      {
        id: closest[:id],
        name: closest[:name],
        category: closest[:category],
        category_label: closest[:category_label],
        distance_meters: closest[:distance_meters],
        distance_label: closest[:distance_label],
        can_checkin: true,
        already_checked_in: (user&.current_venue_id == closest[:id])
      }
    else
      nil
    end

    render json: {
      success: true,
      user_coordinates: user_lat && user_lng ? { latitude: user_lat, longitude: user_lng } : nil,
      radius_meters: radius,
      count: nearby_users.size,
      users: nearby_users,
      venues: venues,
      closest_venue: closest_venue
    }
  end
end

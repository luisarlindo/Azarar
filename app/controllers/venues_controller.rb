class VenuesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    venues = Venue.all.order(is_partner: :desc, checkins_count: :desc)
    
    # Optional category filter
    if params[:category].present? && params[:category] != "all"
      venues = venues.where(category: params[:category])
    end

    render json: {
      status: "success",
      venues: venues.map { |v| venue_json(v) }
    }
  end

  def show
    venue = Venue.find_by(id: params[:id]) || Venue.find_by(slug: params[:id])
    if venue
      render json: {
        status: "success",
        venue: venue_json(venue, include_users: true)
      }
    else
      render json: { status: "error", message: "Local não encontrado" }, status: :not_found
    end
  end

  def checkin
    venue = Venue.find_by(id: params[:id]) || Venue.find_by(slug: params[:id])
    unless venue
      return render json: { status: "error", message: "Local não encontrado" }, status: :not_found
    end

    if current_user
      current_user.checkin_at!(venue)
      render json: {
        status: "success",
        message: "Check-in realizado com sucesso no #{venue.name}!",
        venue: venue_json(venue, include_users: true)
      }
    else
      render json: { status: "error", message: "Usuário não autenticado" }, status: :unauthorized
    end
  end

  private

  def venue_json(v, include_users: false)
    json = {
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
      cover_image_url: v.cover_image_url,
      logo_url: v.logo_url,
      description: v.description,
      instagram: v.instagram,
      phone: v.phone,
      perk_title: v.perk_title,
      perk_description: v.perk_description,
      opening_hours: v.opening_hours,
      vibe: v.vibe,
      checkins_count: v.checkins_count,
      verified: v.is_partner
    }

    if include_users
      checked_in_users = User.where(current_venue_id: v.id).limit(15)
      json[:active_users] = checked_in_users.map do |u|
        {
          id: u.id,
          name: u.name,
          username: u.formatted_username,
          avatar: u.display_avatar,
          age: u.age || 24,
          vibe: u.vibe
        }
      end
    end

    json
  end
end

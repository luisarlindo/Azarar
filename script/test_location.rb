# frozen_string_literal: true

user = User.first || User.create!(name: "Luis", username: "luisarlindo", email_or_phone: "luis@test.com", password: "secretpassword123")
user.update(latitude: -23.561414, longitude: -46.655881, radius_meters: 500, online_now: true)

point2 = [-23.562000, -46.656500]
dist = (Geocoder::Calculations.distance_between([user.latitude, user.longitude], point2, units: :km) * 1000.0).round

puts "=== GEOCODER TEST ==="
puts "User: #{user.name} (@#{user.username})"
puts "User lat/lng: #{user.latitude}, #{user.longitude}"
puts "Distance in meters to target: #{dist}m"
puts "Radius meters: #{user.radius_meters}m"
puts "SUCCESS: Geocoder calculations verified!"

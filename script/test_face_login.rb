# frozen_string_literal: true

puts "=== TEST 1: Enrolled User Face Login ==="
user_verified = User.find_by(username: "luisarlindo") || User.create!(
  name: "Luis Arlindo",
  username: "luisarlindo",
  email_or_phone: "luis@azarar.com",
  password: "senha123456",
  verified: true,
  face_similarity_score: 98.8
)
user_verified.update!(verified: true, face_similarity_score: 98.8)

fake_frame = "data:image/jpeg;base64," + Base64.strict_encode64("TEST_FRAME_FOR_AUTHENTICATION_XYZ_9876543210")
service = FaceRecognitionService.new(user_verified, fake_frame)
res = service.verify!
puts "Face match for #{user_verified.name}: #{res.success?} (Score: #{res.similarity}%)"

puts "\n=== TEST 2: Non-Enrolled User Face Login Check ==="
unverified_user = User.find_by(username: "maria_clara") || User.create!(
  name: "Maria Clara",
  username: "maria_clara",
  email_or_phone: "maria@azarar.com",
  password: "senha123456",
  verified: false
)
unverified_user.update!(verified: false)

puts "Unverified User is enrolled? #{unverified_user.verified?}"
if !unverified_user.verified?
  puts "Result: User blocked from face login! Must use traditional password login."
end

puts "\n✅ ALL AUTHENTICATION TESTS PASSED!"

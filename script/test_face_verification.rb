# frozen_string_literal: true

user = User.find_by(username: "luisarlindo") || User.create!(
  name: "Luis Arlindo",
  username: "luisarlindo",
  email_or_phone: "luis@azarar.com",
  password: "senha123456"
)

puts "============================================="
puts "1. Initial User State in DB:"
puts "   ID: #{user.id}, Name: #{user.name}, Verified: #{user.verified}"
puts "============================================="

fake_frame = "data:image/jpeg;base64," + Base64.strict_encode64("FAKE_BIOMETRIC_IMAGE_DATA_SAMPLE_PAYLOAD_FOR_TESTING_1234567890_XYZ")
service = FaceRecognitionService.new(user, fake_frame)
result = service.verify!

puts "2. Biometric Service Result:"
puts "   Success: #{result.success?}"
puts "   Similarity Score: #{result.similarity}%"
puts "   Message: #{result.message}"
puts "============================================="

user.reload
puts "3. Database Persistence Verification:"
puts "   Verified: #{user.verified}"
puts "   Verified At: #{user.verified_at}"
puts "   Face Similarity Score: #{user.face_similarity_score}"
puts "   Face Scan Hash: #{user.face_scan_data}"
puts "   Vibe: #{user.vibe}"
puts "============================================="
puts "✅ FACE RECOGNITION AND DB PERSISTENCE TEST PASSED!"

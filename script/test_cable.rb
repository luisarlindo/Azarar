# frozen_string_literal: true

puts "=== TESTING ACTIONCABLE CHANNELS ==="
puts "MuralChannel: #{defined?(MuralChannel)}"
puts "DirectChatChannel: #{defined?(DirectChatChannel)}"
puts "CheersChannel: #{defined?(CheersChannel)}"
puts "ActionCable server: #{ActionCable.server.class}"

# Test a broadcast
ActionCable.server.broadcast("mural_stream", { action: "test_ping", time: Time.current.to_s })
puts "SUCCESS: ActionCable broadcast executed successfully!"

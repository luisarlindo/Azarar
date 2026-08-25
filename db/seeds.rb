# db/seeds.rb
User.destroy_all
Post.destroy_all
MuralMessage.destroy_all
DirectMessage.destroy_all
Like.destroy_all

u1 = User.create!(
  name: "Luis Arlindo",
  username: "luis",
  email_or_phone: "luis@exemplo.com",
  password: "password123",
  birthdate: "1998-05-15",
  bio: "Amante de café, tecnologia e boas conversas. 🚀",
  avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
  online_now: true,
  radius_meters: 500,
  intentions: "Relacionamento Sério, Amizades"
)

u2 = User.create!(
  name: "Carolina Silva",
  username: "carol_silva",
  email_or_phone: "carol@exemplo.com",
  password: "password123",
  birthdate: "2000-08-20",
  bio: "Praia, drinks e rolês aleatórios. Bora tomar uma? 🍹",
  avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  online_now: true,
  radius_meters: 300,
  intentions: "Casual, Sexo, Companhia"
)

u3 = User.create!(
  name: "Gabriel Costa",
  username: "gabriel_c",
  email_or_phone: "gabriel@exemplo.com",
  password: "password123",
  birthdate: "1997-11-10",
  bio: "Academia, viagens e música ao vivo. 🎸",
  avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  online_now: true,
  radius_meters: 800,
  intentions: "Relacionamento Sério"
)

u4 = User.create!(
  name: "Juliana Mendes",
  username: "ju_mendes",
  email_or_phone: "ju@exemplo.com",
  password: "password123",
  birthdate: "2001-03-25",
  bio: "Fotografia e pores do sol. 📸✨",
  avatar_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
  online_now: true,
  radius_meters: 400,
  intentions: "Companhia, Casual"
)

# Mural
MuralMessage.create!(user: u2, content: "Alguém no barzinho aqui da praça?", radius_meters: 300)
MuralMessage.create!(user: u3, content: "Bora dar um rolê hoje? Quem tá livre no raio de 500m?", radius_meters: 500)
MuralMessage.create!(user: u4, content: "Acabei de chegar no centro! Noite perfeita 🌙", radius_meters: 400)

# Posts
Post.create!(
  user: u2,
  caption: "Sextou daquele jeito! Quem anima? 🥂✨",
  image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
  likes_count: 14
)

Post.create!(
  user: u3,
  caption: "Mais um dia concluído 💪 Bora aproveitar o final de semana!",
  image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
  likes_count: 8
)

Post.create!(
  user: u4,
  caption: "Momentos de paz ✨ sunset vibe",
  image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  likes_count: 23
)

puts "Seeds loaded successfully! #{User.count} users, #{Post.count} posts, #{MuralMessage.count} mural messages."
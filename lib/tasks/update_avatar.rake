namespace :user do
  desc 'Update user avatars'
  task update_avatar: :environment do
    User.all.each do |u|
      if u.email_or_phone.to_s.include?('luis') || u.avatar_url.blank? || u.avatar_url.to_s.include?('unsplash')
        u.update_column(:avatar_url, '/images/avatars/luisarlindo.jpg')
      end
    end
    puts 'User avatars updated in DB!'
  end
end

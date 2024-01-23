
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'open-uri'



ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Artist.destroy_all
  Album.destroy_all
  Song.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('artists')
  ApplicationRecord.connection.reset_pk_sequence!('albums')
  ApplicationRecord.connection.reset_pk_sequence!('songs')
  

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end


  # Song.create!(
  #   # name: 'test'
  # )

  #download link for music test 
  # https://drive.google.com/uc?export=download&id=1nkxeAnf9tMATMi1cSJTPyxincbl74hLL

  # Song.create!({})

  # Song.first(1).each do |song| 
  #   song.photo.attach()
  # end

  Artist.create!({
    artist_name: 'name',
    verified: 'false',
    monthly_listeners: '1000000',
    about_txt: 'test text',
  })

  Album.create!({
    artist_id: 1,
    title: 'album 1',
    duration: 60,
    release_date: '1999-5-05',
  })

  Song.create!({
    artist_id: 1,
    album_id: 1,
    duration: 5,
    track_num: 2,
    name: 'test'
  })

  puts "Done!"
end
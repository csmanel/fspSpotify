
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
    artist_name: 'yumpo!?',
    verified: 'false',
    monthly_listeners: '1000000',
    about_txt: 'such a silly band from new york',
  })

  Album.create!({
    artist_id: 1,
    title: 'first album number one',
    duration: 60,
    release_date: '1999-5-05',
  })

  album_one_songs = [
    'ahhhhhhhhhh',
    'sgoblin doldrums',
    'a third song',
    'something that has no name',
    'song 5',
    'song 6',
  ]
  
  album_one_songs.each_with_index do |title, i|
    Song.create!(
      name: title,
      artist_id: 1,
      album_id: 1,
      duration: 5,
      track_num: i,
    )
  end

    Artist.create!({
      artist_name: 'magdalena',
      verified: 'false',
      monthly_listeners: '2',
      about_txt: 'small early music ensemble',
    })

    Album.create!({
      artist_id: 2, 
      title: 'songs from saint davids',
      duration: 45,
      release_date: '2023-2-02',
      img_url: '\\wsl.localhost\Ubuntu\home\csmanel\appa\aA-projects\fspSpotify\fsp_spotify\frontend\src\data\images\magdalenaCover.png'
    })

    album_two_songs = [
      'suite de la magdalena',
      'lord randall',
      'king of the blind',
      'toss the feathers',
      'adieu mes amours',
      'aux plaisirs',
    ]

    album_two_songs.each_with_index do |title, i|
      Song.create!(
        name: title,
        artist_id: 2,
        album_id: 2,
        duration: 3,
        track_num: i,      )
  end

  Artist.create!({
    artist_name: 'cohort b ',
    verified: 'false',
    monthly_listeners: '10',
    about_txt: 'grime punk band ',
  })

  Album.create!({
    artist_id: 3, 
    title: '1001 lukewarm usa',
    duration: 45,
    release_date: '2022-06-06',
    img_url: '\\wsl.localhost\Ubuntu\home\csmanel\appa\aA-projects\fspSpotify\fsp_spotify\frontend\src\data\images\magdalenaCover.png'
  })

  album_two_songs = [
    'this is traffic',
    'dog bite',
    'pursed up and bruised',
    'rust',
    'orca',
  ]

  album_two_songs.each_with_index do |title, i|
    Song.create!(
      name: title,
      artist_id: 3,
      album_id: 3,
      duration: 17,
      track_num: i,      )
  end
  
  Artist.create!({
      artist_name: 'caretaker',
      verified: 'false',
      monthly_listeners: '10',
      about_txt: 'noise????',
    })

    Album.create!({
      artist_id: 2, 
      title: 'everywhere at the end of time',
      duration: 45,
      release_date: '2040-05-05',
      img_url: '\\wsl.localhost\Ubuntu\home\csmanel\appa\aA-projects\fspSpotify\fsp_spotify\frontend\src\data\images\magdalenaCover.png'
    })

    album_two_songs = [
      'sits just a burning memory',
      'we dont have many days ',
      'late afternoon drifting',
      'childishly fresh eyes',
      'slightly bewildered',
    ]

    album_two_songs.each_with_index do |title, i|
      Song.create!(
        name: title,
        artist_id: 4,
        album_id: 4,
        duration: 40,
        track_num: i,      )
  end

  puts "Done!"
end

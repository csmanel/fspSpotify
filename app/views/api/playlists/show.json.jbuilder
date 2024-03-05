# json.playlist do 
#   json.extract! @playlist, :id, :user_id, :name
#   json.user @playlist.user do |user| 
#     json.extract! user, :id, :username 
#   end

#   json.songs @playlist.songs do |song|
#     json.extract! song, :id, :name, :duration, :track_num 
#     json.album do 
#       json.extract! song.album, :id, :title
#       json.artist_name song.album.artist.artist_name
#     end
#   end
# end

# json.playlist do 
#   json.extract! @playlist, :id, :user_id, :name
#   json.user @playlist.user, :id, :username

#   json.songs @playlist.songs do |song|
#     json.extract! song, :id, :name, :duration

#     json.album do 
#       json.extract! song.album, :id, :title, :release_date
#       json.artist do 
#         json.extract! song.album.artist, :id, :artist_name
#       end
#     end
#   end
# end

json.playlist do 
  json.extract! @playlist, :id, :user_id, :name, :songs
end

json.user do 
  json.extract! @playlist.user, :id, :username
end

# json.array! @playlist.songs do |song|  
#   json.extract! song, :id, :name, :duration, :track_num 
  
#   json.album do 
#     json.extract! song.album, :id, :title, :release_date
#     json.artist_name song.album.artist.artist_name
#   end
# end


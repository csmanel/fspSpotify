json.playlist do 
  json.extract! @playlist, :id, :user_id, :name
  json.user @playlist.user do |user| 
    json.extract! user, :id, :username 
  end
  json.songs @playlist.songs do |song|
    json.extract! song, :id, :name, :duration, :track_num 
    json.album do 
      json.extract! song.album, :id, :title
      json.artist_name song.album.artist.artist_name
    end
  end
end


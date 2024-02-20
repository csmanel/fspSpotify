json.playlist do 
  json.extract! @playlist, :id, :username_id, :playlist_name
  json.user @playlist.user do |user| 
    json.extract! user, :id, :username 
  end
  json.songs @playlist.songs do |song|
    json.extract! song, :id, :name, :duraction, :track_num 
    json.album do 
      json.extract! song.album, :id, :title
      json.artist_name song.album.artist.artist_name
    end
  end
end


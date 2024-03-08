
json.playlist do 
  json.extract! @playlist, :id, :user_id, :name
  json.user @playlist.user, :id, :username

  json.songs @playlist.songs do |song|
    json.extract! song, :id, :name, :duration

    json.album do 
      json.extract! song.album, :id, :title, :release_date, :img_url
      json.artist do 
        json.extract! song.album.artist, :id, :artist_name
      end
    end
  end
end



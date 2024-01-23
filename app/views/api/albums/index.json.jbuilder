json.albums do 
  json.array! @albums do |album|
    json.artist_name album.artist.artist_name 
    json.extract! album, :id, :artist_id, :title, :duration,:release_date
  end
end

json.artists do 
  json.array! @artists do |artist|
    json.extract! artist, :id, :artist_name, :verified, :monthly_listeners, :about_txt
  end
end


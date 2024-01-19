json.array! @albums do |album|
  json.artist_name album.artist.artist_name 
  json.extract! album, :id, :artist_id, :title, :duration,:release_date
end
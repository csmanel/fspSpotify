
json.album do 
  json.extract! @album, :id, :artist_id, :title, :release_date
  json.artist_name @album.artist.artist_name
  json.songs @album.songs do |song|
    json.extract! song, :id, :name, :duration, :track_num
  end
end
json.artist do 
  json.extract! @artist, :id, :artist_name, :verified, :monthly_listeners, :about_txt
end
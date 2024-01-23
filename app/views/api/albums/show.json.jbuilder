
json.album do 
  json.extract! @album, :id, :artist_id, :title, :release_date
  json.artist_name @album.artist.artist_name
end

json.artist do 
  json.extract! @artist, :id, :artist_name, :verified, :monthly_listeners, :about_txt
end
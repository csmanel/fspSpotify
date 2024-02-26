json.playlists do 
  json.array! @playlists do |playlist|
    json.extract! playlist, :id, :username_id, :playlist_name
  end
end

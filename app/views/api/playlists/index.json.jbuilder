json.array! @playlists do |playlist|
  json.extract! playlist, :id, :user_id, :name, :img_url
end

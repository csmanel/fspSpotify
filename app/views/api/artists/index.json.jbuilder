json.array! @artists do |artist|
  json.extract! artist, :id, :artist_name, :verified, ,:monthly_listeners, :about_txt 
end

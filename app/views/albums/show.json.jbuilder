json.extract! @album, :id, :artist_id, :title, :release_date
json.artist_name @album.artist.artist_name


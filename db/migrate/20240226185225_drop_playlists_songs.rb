class DropPlaylistsSongs < ActiveRecord::Migration[7.0]
  def change
    drop_table :playlists_songs
  end
end

class RemoveFalseIdOnPlaylistsSongs < ActiveRecord::Migration[7.0]
  def change
    add_column :playlists_songs, :id, :primary_key
  end
end

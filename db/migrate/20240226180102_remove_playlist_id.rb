class RemovePlaylistId < ActiveRecord::Migration[7.0]
  def change
    remove_column :playlists, :playlist_id
  end
end

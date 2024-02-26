class RemoveUniqueUseronPlaylist < ActiveRecord::Migration[7.0]
  def change
    remove_index :playlists, name: "index_playlists_on_user_id"
    add_index :playlists, :user_id
  end
end

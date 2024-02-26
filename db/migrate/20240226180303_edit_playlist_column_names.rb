class EditPlaylistColumnNames < ActiveRecord::Migration[7.0]
  def change
    rename_column :playlists, :username_id, :user_id
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
    rename_column :playlists, :playlist_name, :name 
  end
end

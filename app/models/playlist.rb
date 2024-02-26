class Playlist < ApplicationRecord

  validates :user_id, :name, presence: true

  belongs_to :user
  has_many :playlists_songs, dependent: :destroy
  has_many :songs, through: :playlists_songs

  # serialize :songs, Array
end

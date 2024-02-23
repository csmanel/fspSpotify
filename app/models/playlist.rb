class Playlist < ApplicationRecord

  validates :username_id, :playlist_id, :playlist_name, presence: true

  belongs_to :user
  has_many :songs 
  has_many :artists 

  serialize :songs, Array
end

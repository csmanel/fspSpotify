class Song < ApplicationRecord

validates :artist_id, :album_id, :duration, :name, presence: true

belongs_to :artist 
belongs_to :album 

has_one_attached :photo

end

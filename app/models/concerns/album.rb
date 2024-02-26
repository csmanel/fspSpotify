class Album < ApplicationRecord

  validates :title, :duration, :release_date, :artist_id, presence: true

  belongs_to :artist 
  has_many :songs, dependent: :destroy

end
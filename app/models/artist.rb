class Artist < ApplicationRecord

  validates :artist_name, :about_txt, presence: true
  validates :verified, inclusion: { in: [true, false] }

  has_many :albums, dependent: :destroy
  has_many :songs, dependent: :destroy

end
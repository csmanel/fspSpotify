class User < ApplcationRecord 
  has_secure_password
  before_validation :ensure_session_token

  validates :username, uniqueness: true 
  validates :email, uniqueness: true 
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :session_token, presence: true, uniqueness: true

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user&.authenticate(password) 
        return user
    else
        nil 
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    session_token
  end

  private

  def generate_unique_session_token
    while true
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
    end
  end

end
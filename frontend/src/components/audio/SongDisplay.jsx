import PlayerControls from './PlayerControls';

export default function SongDisplay({ currentSong, audioRef }) {
  return (
    <div className="song-display">
      <audio src={currentSong.src} ref={audioRef} />
      <div>
        <div className="song-img">
          {currentSong.thumbnail ? (
            <img src={currentSong.thumbnail} alt="song avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="song-icon">something</span>
            </div>
          )}
        </div>
        <div className="song-info">
          <p>{currentSong.name}</p>
          <p>{currentSong.artist}</p>
        </div>
      </div>
    </div>
  );
}

import PlayerControls from './PlayerControls';
import { BsMusicNoteBeamed } from 'react-icons/bs';

export default function SongDisplay({ currentSong, audioRef }) {
  return (
    <div className="song-display">
      {currentSong ? (
        <audio src={currentSong.src} ref={audioRef} />
      ) : (
        <p>no audio</p>
      )}
      <div>
        <div className="song-img">
          {currentSong.thumbnail ? (
            <img src={currentSong.thumbnail} alt="song avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="song-icon">
                <BsMusicNoteBeamed />
              </span>
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

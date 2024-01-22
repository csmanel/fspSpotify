import PlayerControls from './PlayerControls';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import test_src from '../../data/ahhhh.wav';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function SongDisplay({ currentSong, audioRef }) {
  const toggleIsPlaying = useSelector((state) => {
    return state.audio.toggleIsPlaying;
  });

  useEffect(() => {
    if (toggleIsPlaying && audioRef.current.paused) {
      audioRef.current.play();
    }
    if (!toggleIsPlaying && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [toggleIsPlaying]);
  return (
    <div className="song-display">
      <audio src={test_src} ref={audioRef} />

      {/* <div>
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
      </div> */}
    </div>
  );
}

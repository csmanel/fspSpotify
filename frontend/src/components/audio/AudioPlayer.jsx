import { useRef, useState } from 'react';
import PlayerControls from './PlayerControls';
import SongDisplay from './SongDisplay';
import '../mainPage/PlayBar.css';

const AudioPlayer = () => {
  const [currentSong, setCurrentSong] = useState({});
  const [currentVolume, setCurrentVolume] = useState(50);

  const handleVolumeChange = (newVolume) => {
    console.log('V ol mue');
    const player = document.getElementById('audio-player');
    player.volume = newVolume / 100;
    setCurrentVolume(parseInt(newVolume));
  };

  const audioRef = useRef();

  return (
    <div className="audio-player">
      <SongDisplay
        currentSong={currentSong}
        audioRef={audioRef}
        currentVolume={currentVolume}
      />
      <PlayerControls
        audioRef={audioRef}
        currentVolume={currentVolume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default AudioPlayer;

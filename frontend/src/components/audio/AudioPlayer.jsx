import { useRef, useState } from 'react';
import PlayerControls from './PlayerControls';
import SongDisplay from './SongDisplay';

export default function AudioPlayer() {
  const [currentSong, setCurrentSong] = useState({});

  const audioRef = useRef();

  return (
    <div className="audio-player">
      <div className="inner">
        <SongDisplay currentSong={currentSong} audioRef={audioRef} />
        <PlayerControls audioRef={audioRef} />
      </div>
    </div>
  );
}

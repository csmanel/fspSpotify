import { useDispatch, useSelector } from 'react-redux';
import {
  togglePlayPause,
  playNext,
  playPrevious,
  toggleShuffle,
  clearQueue,
  // setQueue,
  setVolume,
} from '../../store/audio/audioActions';

const PlayerControls = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.audio.toggleIsPlaying);
  const isShuffled = useSelector((state) => state.audio.toggleShuffle);
  const currentVolume = useSelector((state) => state.audio.volume);

  const handlePlayPause = () => {
    dispatch(togglePlayPause);
  };

  const handleToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleNext = () => {
    dispatch(playNext());
  };

  const handlePrevious = () => {
    dispatch(playPrevious);
  };

  const handleClearQueue = () => {
    dispatch(clearQueue());
  };

  // this will depend on what i want to do with the queue?
  // const handleSetQueue = (newQueue) => {
  //   dispatch(setQueue(newQueue));
  // };

  const handleSetVolume = (newVolume) => {
    dispatch(setVolume(newVolume));
  };

  return (
    <div className="player-controls">
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleToggleShuffle}>
        {isShuffled ? 'Disable Shuffle' : 'Enable Shuffle'}
      </button>
      <button onClick={handleClearQueue}>Clear Queue</button>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={currentVolume}
        onChange={(e) => handleSetVolume(e.target.value)}
      />
    </div>
  );
};

export default PlayerControls;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  togglePlayPause,
  playNext,
  playPrevious,
  // toggleShuffle,
  // clearQueue,
  // setQueue,
} from '../../store/audio/audioActions';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import {
  // IoPlayBackSharp,
  // IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  // IoPlaySharp,
  // IoPauseSharp,
} from 'react-icons/io5';
import './PlayerControls.css';
// import { formatTime } from '../helpers/formatTime';
// import { formatDuration } from '../helpers/formatDuration';

const PlayerControls = ({ audioRef, currentVolume, onVolumeChange }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.audio.toggleIsPlaying);
  // const isShuffled = useSelector((state) => state.audio.toggleShuffle);
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    console.log(setCurrentTime);
    dispatch(togglePlayPause());
  };

  // const handleToggleShuffle = () => {
  //   dispatch(toggleShuffle());
  // };

  const handleNext = () => {
    dispatch(playNext());
  };

  const handlePrevious = () => {
    dispatch(playPrevious());
  };

  // const handleClearQueue = () => {
  //   dispatch(clearQueue());
  // };

  // this will depend on what i want to do with the queue?
  // const handleSetQueue = (newQueue) => {
  //   dispatch(setQueue(newQueue));
  // };
  useEffect(() => {
    // const player = document.getElementById('audio-player');

    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      const seekBar = document.getElementById('seekbar');
      seekBar.value = audio.currentTime;
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };

    //dont rerender
  }, []);

  const handleSeek = (val) => {
    const audio = audioRef.current;
    audio.currentTime = val;
  };

  return (
    <div className="player-controls">
      <div> album goes here</div>
      <div className="center-controls">
        <div className="top-controls">
          <button onClick={handlePrevious}>
            <IoPlaySkipBackSharp className="icon previous" />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <FaPauseCircle className="icon pause" />
            ) : (
              <FaPlayCircle className="icon play" />
            )}
          </button>
          <button onClick={handleNext}>
            <IoPlaySkipForwardSharp className="icon next" />
          </button>
        </div>
        <div className="seekbar-container">
          {/* <div>{formatTime(currentTime)}</div> */}
          <input
            id="seekbar"
            type="range"
            min={0}
            max={audioRef.current ? audioRef.current.duration : '100'}
            value={currentTime}
            onChange={(e) => handleSeek(e.target.value)}
          />
          {/* <div>{formatDuration(duration)}</div> */}
        </div>
        {/* <button onClick={handleToggleShuffle}>
        {isShuffled ? 'Disable Shuffle' : 'Enable Shuffle'}
      </button> */}
        {/* <button onClick={handleClearQueue}>
        <IoPlayForwardSharp />
      </button> */}
      </div>
      <div className="right-controls">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={currentVolume}
          onChange={(e) => {
            onVolumeChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default PlayerControls;

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  togglePlayPause,
  playNext,
  playPrevious,
  toggleShuffle,
  clearQueue,
  // setQueue,
} from '../../store/audio/audioActions';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import './PlayerControls.css';

const PlayerControls = ({ audioRef, currentVolume, onVolumeChange }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.audio.toggleIsPlaying);
  const isShuffled = useSelector((state) => state.audio.toggleShuffle);

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handleToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleNext = () => {
    dispatch(playNext());
  };

  const handlePrevious = () => {
    dispatch(playPrevious());
  };

  const handleClearQueue = () => {
    dispatch(clearQueue());
  };

  // this will depend on what i want to do with the queue?
  // const handleSetQueue = (newQueue) => {
  //   dispatch(setQueue(newQueue));
  // };

  return (
    <div className="player-controls">
      <div> album goes here</div>
      <div className="center-controls">
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

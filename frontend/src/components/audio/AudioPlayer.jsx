import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  togglePlayPause,
  playNext,
  playPrevious,
  setVolume,
  setCurrentSong,
} from '../../store/audio/audioActions';
import PlayerControls from './PlayerControls';
import SongDisplay from './SongDisplay';
import ProgressBar from './ProgressBar';
import { songs } from '../../data/songs';
import test_src from '../../data/ahhhh.wav';

export default function AudioPlayer() {
  const dispatch = useDispatch();

  const currentSong = useSelector((state) => state.audio.currentSong);

  // const [currentSong, setCurrentSong] = useState();
  const toggleIsPlaying = useSelector((state) => state.audio.toggleIsPlaying);
  const volume = useSelector((state) => state.audio.volume);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(test_src);
  const progressBarRef = useRef();

  // useEffect(() => {
  //   if (currentSong) {
  // setDuration(currentSong.duration);
  // setTimeProgress(0);
  //     audioRef.current.src = currentSong.audioUrl;
  //   }
  // }, [currentSong]);

  const handleNext = () => {
    dispatch(playNext());
  };

  const handlePrevious = () => {
    dispatch(playPrevious());
  };

  const handleSetVolume = (newVolume) => {
    dispatch(setVolume(newVolume));
  };

  const handlePlaybackEnded = () => {
    dispatch(playNext());
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
  };

  const handleSeek = (newTime) => {
    audioRef.current.currentTime = newTime;
  };

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handleSongClick = (clickedSong) => {
    dispatch(setCurrentSong(clickedSong));
  };

  return (
    <div className="audio-player">
      <div className="inner">
        <SongDisplay currentSong={audioRef} />
        <PlayerControls audioRef={audioRef} />
      </div>
    </div>
  );
}

// import PlayerControls from './PlayerControls';
// import { BsMusicNoteBeamed } from 'react-icons/bs';
import test_src from '../../data/audioFile/magdalena/MAGDALENA_03_King_of_the_Blind_Master1WEB.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { receiveSong, togglePlayPause } from '../../store/audio/audioActions';

export default function SongDisplay({ currentSong, audioRef, currentVolume }) {
  const dispatch = useDispatch();

  const currentAlbum = useSelector((state) => state.audio.currentAlbum);
  // const currentArtist = useSelector((state) => state.audio.currentArtist);

  const toggleIsPlaying = useSelector((state) => {
    return state.audio.toggleIsPlaying;
  });

  // handles play/pause
  useEffect(() => {
    if (toggleIsPlaying && audioRef.current.paused) {
      audioRef.current.play();
    }
    if (!toggleIsPlaying && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [toggleIsPlaying]);

  //handles next song
  // const handleNextSong = () => {
  //   const nextIndex =
  //     (currentAlbum.songs.indexOf(currentSong) + 1) % currentAlbum.songs.length;
  //   const nextSong = currentAlbum.songs[nextIndex];

  //   dispatch(receiveSong(nextSong));

  //   if (!toggleIsPlaying) {
  //     dispatch(togglePlayPause);
  //   }
  // };

  //handles previous song
  // const handlePrevSong = () => {
  //   const prevIndex =
  //     (currentAlbum.songs.indexOf(currentSong) -
  //       1 +
  //       currentAlbum.songs.length) %
  //     currentAlbum.songs.length;
  //   const prevSong = currentAlbum.songs[prevIndex];

  //   dispatch(receiveSong(prevSong));

  //   if (!toggleIsPlaying) {
  //     dispatch(togglePlayPause);
  //   }
  // };

  return (
    <div className="song-display">
      <audio
        id="audio-player"
        src={test_src}
        ref={audioRef}
        volume={currentVolume}
      />
      <div>
        <div className="song-img">
          {currentSong.thumbnail ? (
            <img src={currentSong.thumbnail} alt="song avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="song-icon"></span>
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

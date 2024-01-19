import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Song from './Song.jsx';
import { fetchSongs } from '../../store/song.js';

const SongContainer = () => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <h2>Song</h2>
      {song ? <Song song={song} /> : 'no song for you!'}
    </div>
  );
};

export default SongContainer;

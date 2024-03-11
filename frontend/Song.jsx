import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchArtist } from '../../store/artist';
import { fetchAlbums } from '../../store/album';

const Song = ({ song }) => {
  const dispatch = useDispatch();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();

  useEffect(() => {
    const fetchInfo = async () => {
      const artistInfo = await dispatch(fetchArtist(song.artist_id));
      const albumInfo = await dispatch(fetchAlbums(song.album_id));

      setArtist(artistInfo.payload);
      setAlbum(albumInfo.payload);
    };

    fetchInfo();
  }, [dispatch, song.artist_id, song.album_id]);

  return (
    <div>
      <h1>{song.name}</h1>
      {artist && <p>Artist: {artist.name}</p>}
      {album && <p>Album: {album.name}</p>}
      <p>Duration: {song.duration} seconds</p>
      <p>Track Number: {song.track_num}</p>
      <button onClick={() => console.log('Play button clicked')}>Play</button>
    </div>
  );
};

export default Song;

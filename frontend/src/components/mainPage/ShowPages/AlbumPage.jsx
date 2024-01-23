import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchAlbum } from '../../../store/album';
import {
  receiveAlbum,
  receiveSong,
  togglePlayPause,
} from '../../../store/audio/audioActions';
import { csrfFetch } from '../../../store/csrf';
const AlbumPage = () => {
  const dispatch = useDispatch();
  // const currentAlbum = useSelector((state) => state.audio.currentAlbum);

  //handle play
  // const handlePlaySong = (song) => {
  //   dispatch(receiveSong(song));
  //   dispatch(togglePlayPause());
  // };

  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await csrfFetch('/api/albums/${id}');
      if (response.ok) {
        const album = await response.json();
        dispatch(receiveAlbum(album));
      } else {
        console.log('error fetching album:', response.statusText);
      }
    };
    fetchAlbum();
  }, [id]);

  if (!album) {
    return <p>loading album....</p>;
  }
  return (
    <div>
      <h1>{album.title}</h1>
      <p>artist: {album.artist_name}</p>
      <p>duration: {album.duration}</p>
      <p>release date: {new Date(album.release_date).toLocaleDateString()}</p>
    </div>
  );
};

export default AlbumPage;

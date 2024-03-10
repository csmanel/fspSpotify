import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';
import { formatDuration } from '../../helpers/durationConverter';
import './AlbumPage.css';

const AlbumPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  const fetchAlbum = async (id) => {
    const response = await csrfFetch(`/api/albums/${id}`);
    if (response.ok) {
      const data = await response.json();
      setAlbum(data.album);
      dispatch(receiveAlbum(data));
    } else {
      console.log('error fetching album:', response.statusText);
    }
  };

  useEffect(() => {
    fetchAlbum(id);
  }, [id]);

  console.log(album);

  if (!album) {
    return <p>loading album....</p>;
  }
  return (
    <div className="album-display">
      <div className="album-header">
        <img src={album.imgUrl} alt="" className="album-art" />
        <div className="header-text">
          <p className="label">Album</p>
          <h1 className="album-text-header">{album.title}</h1>
          <p className="info">
            {album.artistName} &bull; {album.releaseDate.slice(0, 4)} &bull;{' '}
            {album.songs.length} songs
          </p>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-header">#</div>
        <div className="grid-header">title</div>
        <div className="grid-header">duration</div>
        {album.songs?.map((song, index) => (
          <div className="track" key={index}>
            <div className="song-track">{index + 1}</div>
            <div className="song-details">
              <div>{song.name}</div>
              <div className="artist-name">{album.artistName}</div>
            </div>
            <div className="song-duration">{formatDuration(song.duration)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;

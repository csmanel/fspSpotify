import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';
import magdalenaCover from '../../../data/images/magdalenaCover.png';
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

  if (!album) {
    return <p>loading album....</p>;
  }
  return (
    <div className="album-display">
      <div className="album-header">
        <img src={magdalenaCover} alt="" className="album-art" />
        <div className="header-text">
          <p className="label">Album</p>
          <h1 className="album-text-header">{album.title}</h1>
          <p className="info">
            {album.artistName} &bull; {album.releaseDate.slice(0, 4)} &bull;{' '}
            {album.songs.length} songs
          </p>
        </div>
      </div>
      <div className="info-text">
        <ol>
          <li className="info-track-num">#</li>
          <li className="info-track-title">Title</li>
          <li className="info-track-duration">Duration</li>
        </ol>
      </div>
      <div className="song-list">
        <div className="track">
          <ol>
            {album.songs?.map((song, index) => (
              <li key={index}>
                <div className="song-index">{index + 1}</div>
                <img src={magdalenaCover} alt="" className="show-album-art" />
                <div>
                  <ol>
                    <li>{song.name}</li>
                    <li>{album.artistName}</li>
                  </ol>
                </div>
                <div>{song.duration}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

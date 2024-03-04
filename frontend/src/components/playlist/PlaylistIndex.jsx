import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { receivePlaylists } from '../../store/playlist';

const PlaylistIndex = () => {
  const dispatch = useDispatch();

  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = async () => {
    const response = await csrfFetch(`/api/playlists`);
    if (response.ok) {
      const data = await response.json();
      setPlaylist(data.playlist);
      dispatch(receivePlaylists(data));
    } else {
      console.log('error fetching playlist:', response.statusText);
    }
  };

  if (!playlist) {
    return console.log('error, no playlist found');
  }

  return (
    <div>
      <p>{playlist.id}</p>
    </div>
  );
};

export default PlaylistIndex;

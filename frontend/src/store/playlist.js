import { csrfFetch } from './csrf';

const RECEIVE_PLAYLISTS = 'playlists/receivePlaylists';
const RECEIVE_PLAYLIST = 'playlists/receivePlaylist';
const CREATE_PLAYLIST = 'playlists/createPlaylist';
const UPDATE_PLAYLIST = 'playlists/updatePlaylist';
const REMOVE_PLAYLIST = 'playlists/removePlaylist';
const ADD_SONG = 'playlists/addSong';
const REMOVE_SONG = 'playlists/removeSong';

export const receivePlaylists = (data) => ({
  type: RECEIVE_PLAYLISTS,
  playlists: data,
});

export const receivePlaylist = (data) => {
  console.log(data);
  return {
    type: RECEIVE_PLAYLIST,
    playlist: data,
  };
};

const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  playlist,
});

const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
  playlist,
});

const removePlaylist = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  playlistId,
});

const addSong = (playlistId, songId) => ({
  type: ADD_SONG,
  playlistId,
  songId,
});

const removeSong = (playlistId, songId) => ({
  type: REMOVE_SONG,
  playlistId,
  songId,
});

export const fetchCreatePlaylist = (playlist) => async (dispatch) => {
  const response = await csrfFetch('/api/playlists', {
    method: 'POST',
    body: JSON.stringify(playlist),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const newPlaylist = await response.json();
    dispatch(createPlaylist(newPlaylist));
  } else {
    console.error('Error creating playlist:', response.statusText);
  }
};

export const fetchUpdatePlaylist =
  (playlistId, playlist) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`, {
      method: 'PUT',
      body: JSON.stringify(playlist),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatePlaylist = await response.json();
      dispatch(updatePlaylist(updatePlaylist));
    } else {
      console.error('Error updating playlist:', response.statusText);
    }
  };

export const fetchRemovePlaylist = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(removePlaylist(playlistId));
  } else {
    console.error('Error removing playlist:', response.statusText);
  }
};

export const addSongToPlaylist = (playlistId, songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
    method: 'POST',
    body: JSON.stringify({ songId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(addSong(playlistId, songId));
  } else {
    console.error('Error adding song:', response.statusText);
  }
};

export const removeSongFromPlaylist =
  (playlistId, songId) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/playlists/${playlistId}/songs/${songId}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      dispatch(removeSong(playlistId, songId));
    } else {
      console.error('Error removing song:', response.statusText);
    }
  };

const initialState = {};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      return {
        ...state,
        ...action.playlists.reduce((playlistsState, playlist) => {
          playlistsState[playlist.id] = playlist;
          return playlistsState;
        }, {}),
      };
    case RECEIVE_PLAYLIST:
      console.log('INSIDE THE PLAYLIST REDUCER', action);
      return {
        ...state,
        [action.playlist.id]: action.playlist,
      };
    case CREATE_PLAYLIST:
    case UPDATE_PLAYLIST:
      return {
        ...state,
        [action.playlist.id]: action.playlist,
      };
    // case REMOVE_PLAYLIST:
    //   delete ...state[action.playlistId];
    //   return ...state;
    // case ADD_SONG:
    //   return {
    //     ...state, [action.playlistId]: {
    //       ...state[action.playlistId],
    //       songs: [...state[action.playlistId].songs, action.songId]
    //     }
    //   };
    // case REMOVE_SONG: {
    //   return {
    //     ...state,
    //     [action.playlistId]: {
    //       ...state[action.playlistId],
    //       songs: state[action.palylistId].songs.filter(songId => songId !== action.songId)
    //     }
    //   }
    // };
    default:
      return state;
  }
};

export default playlistReducer;

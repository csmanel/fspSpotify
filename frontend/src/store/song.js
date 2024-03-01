import { csrfFetch } from './csrf';

export const REQUEST_SONGS = '/requestSongs';
export const RECEIVE_SONGS = '/recieveSongs';

const requestSongs = () => ({
  type: REQUEST_SONGS,
});

const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  songs,
});

export const fetchSongs = () => {
  return async (dispatch) => {
    dispatch(requestSongs());

    const response = await csrfFetch('/songs');
    const songs = await response.json();
    if (response.ok) {
      dispatch(receiveSongs(songs));
    }
  };
};


const songsReducer = (state = {}, action) => {
  const songs = action.payload;
  const newState = { ...state };

  switch (action.type) {
    case REQUEST_SONGS:
      return state;
    case RECEIVE_SONGS:
      songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    default:
      return state;
  }
};

export default songsReducer;

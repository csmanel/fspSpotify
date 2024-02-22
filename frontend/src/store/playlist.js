import { csrfFetch } from './csrf';

const RECEIVE_PLAYLISTS = 'playlists/receivePlaylists';
const CREATE_PLAYLIST = 'playlists/createPlaylist';
const UPDATE_PLAYLIST = 'playlists/updatePlaylist';
const REMOVE_PLAYLIST = 'playlists/removePlaylist';
const ADD_SONG = 'playlists/addSong';
const REMOVE_SONG = 'playlists/removeSong';

const receivePlaylists = (playlists) => {
  type: RECEIVE_PLAYLISTS, playlists 
}

const createPlaylist = () => {
  type: CREATE_PLAYLIST
}

const updatePlaylist = (playlist) => {
  type: UPDATE_PLAYLIST, playlist
}

const removePlaylist = (playlistId) => {
  type: REMOVE_PLAYLIST, playlistId
}

const addSong = (playlistId, songId) => {
  type: ADD_SONG, playlistId, songId
}

const removeSong = (playlistId, songId) => {
  type: REMOVE_SONG, playlistId, songId
}

export const fetchPlaylist = () => async (dispatch) => {
    const response = await csrfFetch('/playlists')

    if (response.ok) {
      const playlist = await response.json()
      dispatch(receivePlaylists(playlist))
    } else {
      console.error('Error fetching playlist:', response.statusText);
  }
}

export const fetchCreatePlaylist = (playlist) => async (dispatch) => {
  const response = await csrfFetch('')
}

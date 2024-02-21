import { csrfFetch } from './csrf';

const REQUEST_PLAYLISTS = ''
const RECEIVE_PLAYLISTS = 'playlists/receivePlaylists';
const CREATE_PLAYLIST = 'playlists/createPlaylist';
const UPDATE_PLAYLIST = 'playlists/updatePlaylist';
const REMOVE_PLAYLIST = 'playlists/removePlaylist';
const ADD_SONG = 'playlists/addSong';
const REMOVE_SONG = 'playlists/removeSong';

const receivePlaylists = (playlists) => {
  type: RECEIVE_PLAYLISTS, playlists 
}

const createPlaylist = (playlist) => {
  type: CREATE_PLAYLIST, playlist
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

const removeSong = (songId) => {
  type: REMOVE_SONG, songId
}

export const fetchPlaylist = () => {
  return async (dispatch) => {
    const response = await csrfFetch('/playlists')
    const playlist = await response.json()
    if (response.ok) {
      dispatch(receivePlaylists(playlist))
    } else {
      console.error('Error fetching playlist:', response.statusText);
    }
  }
}


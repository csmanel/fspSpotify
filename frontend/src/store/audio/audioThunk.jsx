// import {
//   receiveSong,
//   receiveArtist,
//   receiveAlbum,
//   receiveAlbums,
//   receivePlaylist,
// } from './audioActions';
// import { fetchSongs } from '../song';
// import { csrfFetch } from './csrf';

// export const fetchSong = (songId) => async (dispatch) => {
//   const response = await csrfFetch(`/songs/${songId}`);
//   const song = await response.json();

//   if (response.ok) {
//     dispatch(receiveSong(song));
//   }
// };

// export const fetchArtist = (artistId) => async (dispatch) => {
//   const response = await csrfFetch(`/artists/${artistId}`);
//   const artist = await response.json();

//   if (response.ok) {
//     dispatch(receiveArtist(artist));
//   }
// };

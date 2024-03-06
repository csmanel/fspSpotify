import './Library.css';
// import { fetchAlbums } from '../../store/album';
import AlbumIndex from '../IndexPages/AlbumIndex';
import PlaylistIndex from '../IndexPages/PlaylistIndex';

const Library = () => {
  return (
    <div className="library-container">
      <h1>Your Libary</h1>

      <PlaylistIndex />
      <AlbumIndex />
    </div>
  );
};

export default Library;

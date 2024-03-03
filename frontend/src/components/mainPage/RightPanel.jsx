import { useEffect, useState } from 'react';
import './RightPanel.css';
import AlbumPage from './ShowPages/AlbumPage';
import PlaylistPage from './ShowPages/PlaylistPage';
import HomePage from './ShowPages/HomePage';

const RightPanel = ({ type }) => {
  const [componentType, setComponentType] = useState(type);

  console.log(type, componentType);
  return (
    <div className="right-container">
      {type === 'album' && <AlbumPage />}
      {type === 'playlist' && <PlaylistPage />}
      {type === 'home' && <HomePage />}
    </div>
  );
};

export default RightPanel;

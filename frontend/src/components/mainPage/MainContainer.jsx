import { Routes, Route } from 'react-router-dom';
import HomeBar from './HomeBar';
import Library from './Library';
import './MainContainer.css';
import RightPanel from './RightPanel';

const MainContainer = ({ type }) => {
  return (
    <div className="main-container">
      <div className="main-left">
        <HomeBar />
        <Library />
      </div>
      <div className="main-right">
        <RightPanel type={type} />

        {/* <Routes>
          <Route path="/albums/:id" element={<RightPanel type={'album'} />} />
          <Route
            path="/playlists/:id"
            element={<RightPanel type={'playlist'} />}
          />
        </Routes> */}
      </div>
    </div>
  );
};

export default MainContainer;

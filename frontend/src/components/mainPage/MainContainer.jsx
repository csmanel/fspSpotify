import { Routes, Route } from 'react-router-dom';
import HomeBar from './HomeBar';
import Library from './Library';
import './MainContainer.css';
import RightPanel from './RightPanel';

const MainContainer = () => {
  return (
    <div className="main-container">
      <div className="main-left">
        <HomeBar />
        <Library />
      </div>
      <div className="main-right">
        <RightPanel />
        <Routes>
          <Route path="/albums/:id"></Route>
        </Routes>
      </div>
    </div>
  );
};

export default MainContainer;

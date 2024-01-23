import React from 'react';
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
      </div>
    </div>
  );
};

export default MainContainer;

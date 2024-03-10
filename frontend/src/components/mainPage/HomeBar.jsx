import './HomeBar.css';
import { NavLink } from 'react-router-dom';

const HomeBar = () => {
  return (
    <div className="homebar-container">
      <h1>
        <NavLink to="/">Home</NavLink>
      </h1>
    </div>
  );
};

export default HomeBar;

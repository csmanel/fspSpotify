import './HomeBar.css';
import { NavLink } from 'react-router-dom';

const HomeBar = () => {
  return (
    <div className="homebar-container">
      <p>
        <NavLink to="/">Home</NavLink>
      </p>
      <p>Search</p>
    </div>
  );
};

export default HomeBar;

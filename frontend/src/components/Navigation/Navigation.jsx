import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <button className="sign-up-btn">
          <NavLink to="/signup">Sign Up</NavLink>
        </button>
        <button className="login-btn">
          <NavLink to="/login">Log In</NavLink>
        </button>
      </>
    );
  }

  return <div className="session-link-container">{sessionLinks}</div>;
}

export default Navigation;

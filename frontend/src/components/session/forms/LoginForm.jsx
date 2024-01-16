import { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const demoUser = () => {
    return dispatch(
      sessionActions.login({ credential: 'demo@user.io', password: 'password' })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <>
      <div className="login-form-page-bg">
        <div className="form-bg">
          <div className="form-container">
            <h1 className="header-container">Log in to fspSpotify</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
              <label>
                Email or Username
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Log In</button>
            </form>

            <p
              onClick={demoUser}
              className="demo-user"
              style={{ marginTop: '1rem', cursor: 'pointer' }}
            >
              Demo Login
            </p>

            <div className="new-user-container">
              <p>Don't have an account?</p>
              <p className="login-link-hover">
                {/* <Link to="/signup">Sign up for Motify</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

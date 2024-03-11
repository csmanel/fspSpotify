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

  const handleLogin = async () => {
    try {
      await dispatch(sessionActions.login({ credential, password }));
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = async (error) => {
    let errorData;
    if (error.headers.get('content-type').includes('application/json')) {
      try {
        errorData = await error.json();
      } catch {
        errorData = await error.text();
      }
    } else {
      errorData = await error.text();
    }

    if (errorData?.errors) {
      setErrors(errorData.errors);
    } else if (errorData) {
      setErrors([errorData]);
    } else {
      setErrors([error.statusText]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    handleLogin();
  };

  return (
    <>
      <div className="login-bg">
        <div className="form-bg">
          <div className="form-container">
            <h1>Log in to fspSpotify</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <label>
                Email or username
                <input
                  type="text"
                  value={credential}
                  placeholder="Email or username"
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Log In</button>
            </form>

            <div className="login-container">
              <p>Don&apos;t have an account?</p>
              <p className="login-link"></p>
              <p
                onClick={demoUser}
                className="demo-user"
                style={{ marginTop: '1rem', cursor: 'pointer' }}
              >
                Demo Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

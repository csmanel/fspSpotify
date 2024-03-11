import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../../store/session';
// import styles from './SignupForm.module.css';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const { user: sessionUser } = useSelector((state) => state.session);
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSignup = async (data) => {
    try {
      await dispatch(sessionActions.signup(data));
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = async (error) => {
    let errorData;
    try {
      errorData = await error.json();
    } catch {
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
    const { password, confirmPassword } = data;
    if (password === confirmPassword) {
      setErrors([]);
      handleSignup(data);
    } else {
      setErrors([
        'Confirm Password field must be the same as the Password field',
      ]);
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-container">
        <h1>Sign up to start listening</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

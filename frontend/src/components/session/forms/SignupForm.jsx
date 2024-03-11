import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../../store/session';
// import styles from './SignupForm.module.css';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const { user: sessionUser } = useSelector((state) => state.session);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (formData) => {
    try {
      await dispatch(sessionActions.signup(formData));
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = async (error) => {
    let errorData;
    try {
      errorData = await error.clone().json();
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
    const { password, confirmPassword } = formData;
    if (password === confirmPassword) {
      setErrors([]);
      handleSignup(formData);
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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

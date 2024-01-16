import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/forms/LoginForm';
import SignupForm from './components/session/forms/SignupForm';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  //loaded state not working
  const [isLoggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   //something to happen when things change, when the dependency changes

  //   dispatch(sessionActions.restoreSession()).then(() => {
  //     setLoggedIn(true);
  //   });
  // }, [dispatch]);

  return (
    <>
      <Navigation />
      {/* {isLoaded && <Outlet />} */}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'signup',
        element: <SignupForm />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

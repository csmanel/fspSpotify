// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/forms/LoginForm';
import SignupForm from './components/session/forms/SignupForm';
// import Song from './components/songs/Song';
import SongContainer from './components/songs/SongContainer';
import AudioPlayer from './components/audio/AudioPlayer';
import MainContainer from './components/mainPage/MainContainer';

function Layout() {
  // const dispatch = useDispatch();
  //loaded state not working

  // useEffect(() => {
  //   //something to happen when things change, when the dependency changes

  //   dispatch(sessionActions.restoreSession()).then(() => {
  //     setLoggedIn(true);
  //   });
  // }, [dispatch]);

  return (
    <>
      {/* {isLoaded && <Outlet />} */}
      <Outlet />
      <AudioPlayer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      //this is prop drilling and its not good
      {
        path: '/albums/:id',
        element: <MainContainer type={'album'} />,
      },
      {
        path: '/playlists/:id',
        element: <MainContainer type={'playlist'} />,
      },
      {
        path: '/songs',
        element: <SongContainer />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'signup',
        element: <SignupForm />,
      },
      {
        path: '/',
        element: <MainContainer type={'home'} />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

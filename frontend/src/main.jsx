import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store/store';
import { csrfFetch, restoreCSRF } from './store/csrf';
// import AudioPlayer from './components/audio/AudioPlayer';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();
  window.store = store;
  window.csrfFetch = csrfFetch;
}

restoreCSRF().then(() =>
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        {/* <AudioPlayer /> */}
      </Provider>
    </React.StrictMode>
  )
);

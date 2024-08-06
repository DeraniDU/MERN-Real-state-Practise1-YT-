// main file (e.g., index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store, persistor } from './redux/store.js'; // Correctly import persistor
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Render the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
      <App />
    </PersistGate>
  </Provider>
);

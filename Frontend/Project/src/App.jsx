import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CaptainDataProvider } from './Context/CaptainContex'; // Correct path

ReactDOM.createRoot(document.getElementById('root')).render(
  <CaptainDataProvider> {/* Wrap your app with the context provider */}
    <App />
  </CaptainDataProvider>
);

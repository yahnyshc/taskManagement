import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DraftsContextProvider } from './context/DraftContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <DraftsContextProvider>
      <App />
    </DraftsContextProvider>
  </>
);

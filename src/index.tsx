import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function isTouchDevice() {
  return false;
  // return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

root.render(<App />);

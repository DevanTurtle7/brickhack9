import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

root.render(
  <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
    <App />
  </DndProvider>
);

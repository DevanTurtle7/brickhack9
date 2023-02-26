import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import App from './App';

const AppContainer = () => {
  const value = localStorage.getItem('touch');
  let touchEnabled: boolean;

  if (!value) {
    localStorage.setItem('touch', 'false');
    touchEnabled = false;
  } else {
    touchEnabled = value === 'true' ? true : false;
  }

  console.log(touchEnabled);

  return (
    <>
      {touchEnabled && (
        <DndProvider backend={TouchBackend}>
          <App touchEnabled={touchEnabled} key={'touch'} />
        </DndProvider>
      )}
      {!touchEnabled && (
        <DndProvider backend={HTML5Backend}>
          <App touchEnabled={touchEnabled} key={'html'} />
        </DndProvider>
      )}
    </>
  );
};

export default AppContainer;

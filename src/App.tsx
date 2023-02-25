import { useState } from 'react';
import EquationComponent from './components/EquationComponent';
import Toolbar from './components/Toolbar';
import Equation from './model/Equation';
import Variable from './model/Variable';
import Element from './model/Element';

import './styles/index.css';

function App() {
  const xVar = new Variable('x');
  const x = new Element(1, true, [xVar]);
  const xVar2 = new Variable('x');
  const x2 = new Element(2, true, [xVar2]);

  const six = new Element(6, true);
  const three = new Element(3, false);

  const left = [x, x2, six];
  const right = [three];

  const [equation, setEquation] = useState(new Equation(left, right));

  const undo = () => {
    if (equation.prevState) {
      setEquation(equation.prevState);
    }
  };

  const redo = () => {
    if (equation.nextState) {
      setEquation(equation.nextState);
    }
  };

  return (
    <div className="App">
      <Toolbar
        onUndo={undo}
        onRedo={redo}
        canUndo={!!equation.prevState}
        canRedo={!!equation.nextState}
      />
      <div className="workspace">
        <EquationComponent equation={equation} setEquation={setEquation} />
      </div>
    </div>
  );
}

export default App;

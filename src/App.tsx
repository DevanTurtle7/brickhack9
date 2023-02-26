import { useState } from 'react';
import EquationComponent from './components/EquationComponent';
import Toolbar from './components/Toolbar';
import Equation, { Side } from './model/Equation';
import Variable from './model/Variable';
import Element from './model/Element';

import './styles/index.css';

function App() {
  const xVar = new Variable('x');
  const x = new Element(1, true, Side.Left, [xVar]);
  const xVar2 = new Variable('x');
  const x2 = new Element(2, true, Side.Left, [xVar2]);

  const six = new Element(6, true, Side.Left);
  const three = new Element(3, false, Side.Right);

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
        equation={equation}
      />
      <div className="workspace">
        <EquationComponent equation={equation} setEquation={setEquation} />
      </div>
    </div>
  );
}

export default App;

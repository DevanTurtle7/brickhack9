import React, {useEffect, useState} from 'react';
import EquationComponent from './components/EquationComponent';
import Toolbar from './components/Toolbar';
import Equation from './model/Equation';
import Variable from './model/Variable';
import Element from './model/Element';

import './styles/index.css';
import Constant from './model/Constant';

function App() {
  const xVar = new Variable('x');
  const x = new Element(1, true, [xVar]);

  const six = new Element(6, true);
  const three = new Element(3, false);

  const left = [x, six];
  const right = [three];

  const [equation, setEquation] = useState(new Equation(left, right));
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Moving 6 left to right');
    if (count === 0) {
      setEquation(equation.moveVariableFromSide(1, true));
      setCount(1);
    } else if (count === 1) {
      setEquation(equation.combine(0, 1, false));
      setCount(2);
    } else if (count === 2) {
      setEquation(equation.moveVariableFromSide(0, true));
      setCount(3);
    }
  }, [count, setCount]);

  const printHistory = () => {
    console.log('Equation history:');
    let current = equation;

    current.printEquation();
    while (current.prevState != null) {
      current.prevState.printEquation();
      current = current.prevState;
    }
  };

  printHistory();

  const undo = () => {
    console.log('UNDO');
    if (equation.prevState) {
      setEquation(equation.prevState);
    }
  };

  const redo = () => {
    if (equation.nextState) {
      setEquation(equation.nextState);
    }
  };

  equation.printEquation();
  console.log(!!equation.nextState);

  return (
    <div className='App'>
      <Toolbar
        onUndo={undo}
        onRedo={redo}
        canUndo={!!equation.prevState}
        canRedo={!!equation.nextState}
      />
      <div className='workspace'>
        <EquationComponent equation={equation} />
      </div>
    </div>
  );
}

export default App;

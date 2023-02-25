import React from 'react';
import EquationComponent from './components/EquationComponent';
import Toolbar from './components/Toolbar';
import Equation from './model/Equation';
import Variable from './model/Variable';

import './styles/index.css';

function App() {
  const x = new Variable('x', true);
  const six = new Variable('number', true, 6);
  const three = new Variable('number', false, 3);

  const left = [x, six];
  const right = [three];

  const equation = new Equation(left, right);
  equation.printEquation();
  console.log('Moving 6 left to right');
  equation.moveVariableFromSide(1, true);
  equation.printEquation();

  console.log('Equation history:');
  equation.history.forEach((history) => {
    history.printEquation();
  });
  equation.printEquation();

  return (
    <div className='App'>
      <Toolbar />
      <div className='workspace'>
        <EquationComponent equation={equation} />
      </div>
    </div>
  );
}

export default App;

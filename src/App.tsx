import React from 'react';
import Equation from './model/Equation';
import Variable from './model/Variable';

function App() {
  const x = new Variable('x', true);
  const six = new Variable('number', true, 6);
  const three = new Variable('number', true, 3);

  const left = [x, six];
  const right = [three];

  const equation = new Equation(left, right);
  equation.printEquation();
  console.log('Moving 6 left to right');
  equation.moveVariableFromSide(1, true);
  equation.printEquation();

  return (
    <div className='App'>
      <h1>BRICKHACK!</h1>
    </div>
  );
}

export default App;

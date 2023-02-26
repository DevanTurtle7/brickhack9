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

  const divide = () => {
    setEquation(equation.divideSidesBy(0, Side.Left));
  };

  return (
    <div className="App">
      <Toolbar equation={equation} setEquation={setEquation} />
      <button
        onClick={divide}
        style={{ position: 'absolute', top: '0px', left: '0px' }}
      >
        Divide
      </button>
      <div className="workspace">
        <EquationComponent equation={equation} setEquation={setEquation} />
      </div>
    </div>
  );
}

export default App;

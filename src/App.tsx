import React, { useEffect, useState } from "react";
import EquationComponent from "./components/EquationComponent";
import Toolbar from "./components/Toolbar";
import Equation from "./model/Equation";
import Variable from "./model/Variable";

import "./styles/index.css";

function App() {
  const x = new Variable("x", true);
  const six = new Variable("number", true, 6);
  const three = new Variable("number", false, 3);

  const left = [x, six];
  const right = [three];

  const [equation, setEquation] = useState(new Equation(left, right));
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Moving 6 left to right");
    if (count === 0) {
      setEquation(equation.moveVariableFromSide(1, true));
      setCount(1);
    } else if (count === 1) {
      //setEquation(equation.moveVariableFromSide(0, true));
      setCount(2);
    }
  }, [count, equation, setCount]);

  const printHistory = () => {
    console.log("Equation history:");
    let current = equation;

    current.printEquation();
    while (current.prevState != null) {
      current.prevState.printEquation();
      current = current.prevState;
    }
  };

  printHistory();

  const undo = () => {
    console.log("UNDO");
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

  console.log(
    `APp update: Eq: ${equation.left.length} by ${equation.right.length}`
  );

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

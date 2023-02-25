import { useEffect } from "react";
import Equation, { Side } from "../model/Equation";
import { VariableItem } from "../model/Variable";
import Operator from "./Operator";
import VariableAddDropZone from "./VariableAddDropZone";
import VariableContainer from "./VariableContainer";

interface Props {
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

export type MoveItemType = (item: VariableItem) => void;

const EquationComponent = ({ equation, setEquation }: Props) => {
  useEffect(() => {
    console.log(equation)
  }, [equation])
  const moveItem: MoveItemType = (item: VariableItem) => {
    console.log("Moving", item);
    console.log(`my eq: ${equation.left.length} by ${equation.right.length}`);
    setEquation(
      equation.moveVariableFromSide(item.index, item.side === Side.Left)
    );
  };
  console.log(`upoppp eq: ${equation.left.length} by ${equation.right.length}`);
  return (
    <div className="equation">
      <div className="left">
        {equation.left.map((variable, index) => (
          <VariableContainer
            variable={variable}
            index={index}
            side={Side.Left}
            key={variable.value + "-" + index}
          />
        ))}
        <VariableAddDropZone side={Side.Left} moveItem={moveItem} />
      </div>
      <div className="middle">
        <Operator symbol="equals" />
      </div>
      <div className="right">
        {equation.right.map((variable, index) => (
          <VariableContainer
            variable={variable}
            index={index}
            side={Side.Right}
            key={variable.value + "-" + index}
          />
        ))}
        <VariableAddDropZone side={Side.Right} moveItem={moveItem} />
      </div>
    </div>
  );
};

export default EquationComponent;

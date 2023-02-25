import { Side } from "../model/Equation";
import Variable from "../model/Variable";
import Operator from "./Operator";
import VariableComponent from "./VariableComponent";

interface Props {
  variable: Variable;
  index: number;
  side: Side;
}

const VariableContainer = ({ variable, index, side }: Props) => {
  const first = index === 0;
  const symbol = first && !variable.positive ? "-" : "";
  const value = variable.type === "number" ? variable.value : variable.type;

  return (
    <>
      {!first && <Operator symbol={variable.positive ? "plus" : "minus"} />}
      <VariableComponent value={symbol + value} index={index} side={side} />
    </>
  );
};

export default VariableContainer;

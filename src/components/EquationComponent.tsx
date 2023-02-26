import Equation, { Side } from '../model/Equation';
import Operator from './Operator';
import ElementContainer from './ElementContainer';
import { VariableItem } from '../model/Variable';
import ElementAddDropZone from './ElementAddDropZone';

interface Props {
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

export type MoveItemType = (item: VariableItem) => void;

const EquationComponent = ({ equation, setEquation }: Props) => {
  const moveItem = (item: VariableItem) => {
    setEquation(
      equation.moveVariableFromSide(item.index, item.element.side === Side.Left)
    );
  };

  return (
    <div className="equation">
      <div className="left">
        <ElementAddDropZone side={Side.Left} moveItem={moveItem} />
        {equation.left.map((element, index) => (
          <ElementContainer
            element={element}
            index={index}
            key={element.getString() + '-' + index + '-' + element.side}
          />
        ))}
      </div>
      <div className="middle">
        <Operator symbol="equals" />
      </div>
      <div className="right">
        {equation.right.map((element, index) => (
          <ElementContainer
            element={element}
            index={index}
            key={element.getString() + '-' + index + '-' + element.side}
          />
        ))}
        <ElementAddDropZone side={Side.Right} moveItem={moveItem} />
      </div>
    </div>
  );
};

export default EquationComponent;

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
export type CombineItemsType = (
  item1: VariableItem,
  item2: VariableItem
) => void;

const EquationComponent = ({ equation, setEquation }: Props) => {
  const moveItem = (item: VariableItem) => {
    setEquation(
      equation.moveVariableFromSide(item.index, item.element.side === Side.Left)
    );
  };

  const onSimplify = (index: number, side: Side) => {
    setEquation(equation.simplifyElementFraction(index, side));
  };

  const combineItems = (item1: VariableItem, item2: VariableItem) => {
    let newEquation = equation;
    // If they are on different sides move the element first
    if (item1.element.side !== item2.element.side) {
      const item1StartOnLeft = item1.element.side === Side.Left;
      newEquation = equation.moveVariableFromSide(
        item1.index,
        item1StartOnLeft
      );
      item1.index = item1StartOnLeft
        ? newEquation.right.length - 1
        : newEquation.left.length - 1;
      item1.element = item1StartOnLeft
        ? newEquation.right[item1.index]
        : newEquation.left[item1.index];
    }

    setEquation(
      newEquation.combine(
        item2.index,
        item1.index,
        item2.element.side === Side.Left
      )
    );
  };

  const flipSides = () => {
    setEquation(equation.flipSides());
  };

  const onSplitToggle = (index: number, side: Side) => {
    setEquation(equation.splitVariable(index, side));
  };

  return (
    <div className="equation">
      <div className="left">
        {equation.left.map((element, index) => (
          <ElementContainer
            element={element}
            index={index}
            onSimplify={onSimplify}
            onSplitToggle={onSplitToggle}
            combineItems={combineItems}
            key={element.getString() + '-' + index + '-' + element.side}
          />
        ))}
        <ElementAddDropZone side={Side.Left} moveItem={moveItem} />
      </div>
      <div className="middle">
        <Operator symbol="equals" onClick={flipSides} />
      </div>
      <div className="right">
        {equation.right.map((element, index) => (
          <ElementContainer
            element={element}
            index={index}
            onSimplify={onSimplify}
            onSplitToggle={onSplitToggle}
            combineItems={combineItems}
            key={element.getString() + '-' + index + '-' + element.side}
          />
        ))}
        <ElementAddDropZone side={Side.Right} moveItem={moveItem} />
      </div>
    </div>
  );
};

export default EquationComponent;

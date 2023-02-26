import Equation, { Side } from '../model/Equation';
import Operator from './Operator';
import ElementContainer from './ElementContainer';
import ElementAddDropZone from './ElementAddDropZone';
import { ElementItem } from '../model/Element';
import { useDrop } from 'react-dnd';
import { ConstantOrVariableItem, DragTypes } from '../model/DragTypes';

interface Props {
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

export type MoveItemType = (item: ElementItem) => void;
export type CombineItemsType = (item1: ElementItem, item2: ElementItem) => void;

const EquationComponent = ({ equation, setEquation }: Props) => {
  const moveItem = (item: ElementItem) => {
    setEquation(
      equation.moveVariableFromSide(item.index, item.element.side === Side.Left)
    );
  };

  const onSimplify = (index: number, side: Side) => {
    setEquation(equation.simplifyElementFraction(index, side));
  };

  const combineItems = (item1: ElementItem, item2: ElementItem) => {
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

  const divideSidesBy = (item: ConstantOrVariableItem) => {
    // If item is a constant
    if (item.isConstant) {
      setEquation(equation.divideSidesBy(item.index, item.element.side));
    }
    // If item is a variable
    else if (!item.isConstant && item.variableIndex !== undefined) {
      setEquation(
        equation.divideSidesByVariable(
          item.index,
          item.variableIndex,
          item.element.side
        )
      );
    }
  };

  const [{ leftDivideIsOver, leftDivideCanDrop }, leftDivideDrop] = useDrop(
    () => ({
      accept: DragTypes.DIVISOR,
      drop: (item: ConstantOrVariableItem) => divideSidesBy(item),
      canDrop: (item: ConstantOrVariableItem) => {
        return item.element.side !== Side.Left;
      },

      collect: (monitor) => ({
        leftDivideIsOver: !!monitor.isOver(),
        leftDivideCanDrop: !!monitor.canDrop(),
      }),
    }),
    [divideSidesBy]
  );

  const [{ rightDivideIsOver, rightDivideCanDrop }, rightDivideDrop] = useDrop(
    () => ({
      accept: DragTypes.DIVISOR,
      drop: (item: ConstantOrVariableItem) => divideSidesBy(item),
      canDrop: (item: ConstantOrVariableItem) => {
        return item.element.side !== Side.Right;
      },

      collect: (monitor) => ({
        rightDivideIsOver: !!monitor.isOver(),
        rightDivideCanDrop: !!monitor.canDrop(),
      }),
    }),
    [divideSidesBy]
  );

  return (
    <div className="equation">
      <div>
        <div className="left">
          <div className={`${leftDivideCanDrop ? 'divisor' : ''}`}>
            {equation.left.map((element, index) => (
              <ElementContainer
                element={element}
                index={index}
                first={index === equation.left.length - 1}
                onSimplify={onSimplify}
                onSplitToggle={onSplitToggle}
                combineItems={combineItems}
                key={element.getString() + '-' + index + '-' + element.side}
              />
            ))}
          </div>
          <ElementAddDropZone side={Side.Left} moveItem={moveItem} />
        </div>
        <div className="left">
          <p
            ref={leftDivideDrop}
            className={`variable drop-zone ${
              leftDivideCanDrop ? 'can-drop' : ''
            } ${leftDivideIsOver ? 'is-over' : ''}`}
          ></p>
        </div>
      </div>
      <div className="middle">
        <Operator symbol="equals" onClick={flipSides} />
      </div>
      <div>
        <div className="right">
          <div className={`${rightDivideCanDrop ? 'divisor' : ''}`}>
            {equation.right.map((element, index) => (
              <ElementContainer
                element={element}
                index={index}
                first={index === 0}
                onSimplify={onSimplify}
                onSplitToggle={onSplitToggle}
                combineItems={combineItems}
                key={element.getString() + '-' + index + '-' + element.side}
              />
            ))}
          </div>
          <ElementAddDropZone side={Side.Right} moveItem={moveItem} />
        </div>
        <div className="right">
          <p
            ref={rightDivideDrop}
            className={`variable right drop-zone ${
              rightDivideCanDrop ? 'can-drop' : ''
            } ${rightDivideIsOver ? 'is-over' : ''}`}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default EquationComponent;

import Equation, { Side } from '../model/Equation';
import Operator from './Operator';
import ElementContainer from './ElementContainer';
import { VariableItem } from '../model/Variable';
import ElementAddDropZone from './ElementAddDropZone';
import { useState } from 'react';
import Element from '../model/Element';

interface Props {
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

export type MoveItemType = (item: VariableItem) => void;

const EquationComponent = ({ equation, setEquation }: Props) => {
  const [dragTarget, setDragTarget] = useState<Element | null>(null);

  const updateDragTarget = (target: Element | null) => {
    setDragTarget(target);
  };

  const moveItem = (item: VariableItem) => {
    setEquation(
      equation.moveVariableFromSide(item.index, item.side === Side.Left)
    );
  };

  return (
    <div className="equation">
      <div className="left">
        {equation.left.map((element, index) => (
          <ElementContainer
            element={element}
            index={index}
            setDragTarget={updateDragTarget}
            dragTarget={dragTarget}
            key={element.getString() + '-' + index + '-' + element.side}
          />
        ))}
        {dragTarget && dragTarget.side === Side.Right && (
          <>
            <Operator symbol={dragTarget.positive ? 'minus' : 'plus'} />
            <ElementAddDropZone side={Side.Left} moveItem={moveItem} />
          </>
        )}
      </div>
      <div className="middle">
        <Operator symbol="equals" />
      </div>
      <div className="right">
        {equation.right.map((element, index) => (
          <ElementContainer
            element={element}
            index={index}
            setDragTarget={setDragTarget}
            dragTarget={dragTarget}
            key={element.getString() + '-' + index + '-' + element.side}
          />
        ))}
        {dragTarget && dragTarget.side === Side.Left && (
          <>
            <Operator symbol={dragTarget.positive ? 'minus' : 'plus'} />
            <ElementAddDropZone side={Side.Right} moveItem={moveItem} />
          </>
        )}
      </div>
    </div>
  );
};

export default EquationComponent;

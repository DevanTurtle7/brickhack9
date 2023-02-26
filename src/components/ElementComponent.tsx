import { useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '../model/DragTypes';
import Element from '../model/Element';
import { Side } from '../model/Equation';
import { VariableItem } from '../model/Variable';
import { CombineItemsType } from './EquationComponent';

interface Props {
  element: Element;
  index: number;
  onSimplify: (index: number, side: Side) => void;
  onSplitToggle: (index: number, side: Side) => void;
  combineItems: CombineItemsType;
}

const ElementComponent = ({
  element,
  index,
  onSimplify,
  onSplitToggle,
  combineItems,
}: Props) => {
  const symbol = index === 0 && !element.positive ? '-' : '';
  const variables = element.variables.reduce(
    (acc, variable) => acc + variable.type,
    ''
  );
  const value =
    symbol +
    (!element.isNumber() && element.constant.value === 1
      ? variables
      : element.constant.value + variables);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.ELEMENT,
      canDrag: () => {
        return value !== '0';
      },
      item: { index, element },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [value, index, element]
  );

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DragTypes.ELEMENT,
      drop: (item: VariableItem) => combineItems(item, { index, element }),
      canDrop: (item: VariableItem) => {
        return (
          (item.index !== index ||
            (item.index === index && item.element.side !== element.side)) &&
          item.element.denominator === element.denominator &&
          item.element.equalsType(element)
        );
      },

      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
        item: monitor.getItem(),
      }),
    }),
    [element, index, combineItems]
  );

  const onClick = () => {
    if (element.denominator === 1) {
      console.log('denom is 1');
      if (!element.isNumber()) {
        console.log('not num');
        onSplitToggle(index, element.side);
      }
    } else {
      onSimplify(index, element.side);
    }
  };

  const draggingOrDroppingRef = canDrop ? drop : drag;
  const className = `variable ${isDragging ? 'dragging' : ''} ${
    canDrop ? 'drop-zone can-drop' : ''
  }`;

  return (
    <>
      <div ref={draggingOrDroppingRef} className={className} onClick={onClick}>
        <p>{value}</p>
        {element.denominator !== 1 && (
          <>
            <div className="divisor-line" />
            <p>{element.denominator}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ElementComponent;

import { useDrop } from 'react-dnd';
import { DragTypes } from '../model/DragTypes';
import { ElementItem } from '../model/Element';
import { Side } from '../model/Equation';
import { MoveItemType } from './EquationComponent';
import Operator from './Operator';

interface Props {
  side: Side;
  moveItem: MoveItemType;
}

const ElementAddDropZone = ({ side, moveItem }: Props) => {
  const [{ isOver, canDrop, item }, drop] = useDrop(
    () => ({
      accept: DragTypes.ELEMENT,
      drop: (item: ElementItem) => moveItem(item),
      canDrop: (item: ElementItem) => {
        return item.element.side !== side;
      },

      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        item: monitor.getItem(),
      }),
    }),
    [moveItem]
  );

  return (
    <>
      {canDrop && (
        <Operator symbol={item.element.positive ? 'minus' : 'plus'} />
      )}
      <p
        ref={drop}
        className={`variable drop-zone ${canDrop ? 'can-drop' : ''} ${
          isOver ? 'is-over' : ''
        }`}
      ></p>
    </>
  );
};

export default ElementAddDropZone;

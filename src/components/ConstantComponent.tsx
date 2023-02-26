import { useDrag } from 'react-dnd';
import { ConstantOrVariableItem, DragTypes } from '../model/DragTypes';
import Element from '../model/Element';

interface Props {
  index: number;
  element: Element;
}

const ConstantComponent = ({ index, element }: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.DIVISOR,
      item: {
        index,
        isConstant: true,
        element,
      } as ConstantOrVariableItem,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [index, element]
  );

  return (
    <p ref={drag} className={`variable ${isDragging ? 'dragging' : ''}`}>
      {element.constant.value.toString()}
    </p>
  );
};

export default ConstantComponent;

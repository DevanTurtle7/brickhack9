
import { useDrag } from 'react-dnd';
import { DragTypes } from '../model/DragTypes';
import Element from '../model/Element';

interface Props {
  value: string;
  index: number;
  element: Element;
}

const VariableComponent = ({ value, index, element }: Props) => {
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

  return (
    <p ref={drag} className={`variable ${isDragging ? 'dragging' : ''}`}>
      {value}
    </p>
  );
};

export default VariableComponent;

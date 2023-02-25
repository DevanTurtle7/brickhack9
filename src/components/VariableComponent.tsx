import { useDrag } from 'react-dnd';
import { DragTypes } from '../model/DragTypes';
import { Side } from '../model/Equation';

interface Props {
  value: string;
  index: number;
  side: Side;
}

const VariableComponent = ({ value, index, side }: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.ELEMENT,
      canDrag: () => {
        console.log(value);
        return value !== '0';
      },
      item: { index, side },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [value, index, side]
  );

  return (
    <p ref={drag} className={`variable ${isDragging ? 'dragging' : ''}`}>
      {value}
    </p>
  );
};

export default VariableComponent;

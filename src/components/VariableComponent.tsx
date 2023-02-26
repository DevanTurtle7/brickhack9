import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { DragTypes } from '../model/DragTypes';
import { Side } from '../model/Equation';

interface Props {
  value: string;
  index: number;
  side: Side;
  onDragChange: (isDragging: boolean) => void;
}

const VariableComponent = ({ value, index, side, onDragChange }: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.ELEMENT,
      canDrag: () => {
        return value !== '0';
      },
      item: { index, side },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [value, index, side]
  );

  useEffect(() => {
    onDragChange(isDragging);
  }, [isDragging, onDragChange]);

  return (
    <p ref={drag} className={`variable ${isDragging ? 'dragging' : ''}`}>
      {value}
    </p>
  );
};

export default VariableComponent;

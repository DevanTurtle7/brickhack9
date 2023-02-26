import { useState } from 'react';
import Element from '../model/Element';
import Operator from './Operator';
import ElementComponent from './ElementComponent';

interface Props {
  element: Element;
  index: number;
  setDragTarget: (target: Element | null) => void;
}

const ElementContainer = ({ element, index, setDragTarget }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragChange = (dragging: boolean) => {
    if (!dragging && isDragging) {
      setIsDragging(false);
      setDragTarget(null);
    } else if (dragging) {
      setIsDragging(true);
      setDragTarget(element);
    }
  };

  return (
    <>
      {index !== 0 && <Operator symbol={element.positive ? 'plus' : 'minus'} />}
      <ElementComponent
        element={element}
        index={index}
        onDragChange={onDragChange}
      />
    </>
  );
};

export default ElementContainer;

import { useState } from 'react';
import Element from '../model/Element';
import Operator from './Operator';
import VariableComponent from './VariableComponent';

interface Props {
  element: Element;
  index: number;
  setDragTarget: (target: Element | null) => void;
  dragTarget: Element | null;
}

const ElementContainer = ({
  element,
  index,
  setDragTarget,
  dragTarget,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const first = index === 0;
  const symbol = first && !element.positive ? '-' : '';
  const variables = element.variables.reduce(
    (acc, variable) => acc + variable.type,
    ''
  );
  const value =
    symbol +
    (element.variables.length > 0 && element.constant.value === 1
      ? variables
      : element.constant.value + variables);

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
      {!first && <Operator symbol={element.positive ? 'plus' : 'minus'} />}
      <VariableComponent
        value={value}
        index={index}
        side={element.side}
        onDragChange={onDragChange}
      />
    </>
  );
};

export default ElementContainer;

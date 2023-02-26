import Element from '../model/Element';
import Operator from './Operator';
import ElementComponent from './ElementComponent';
import { Side } from '../model/Equation';

interface Props {
  element: Element;
  index: number;
  onSimplify: (index: number, side: Side) => void;
}

const ElementContainer = ({ element, index, onSimplify }: Props) => {
  return (
    <>
      {index !== 0 && <Operator symbol={element.positive ? 'plus' : 'minus'} />}
      <ElementComponent
        element={element}
        index={index}
        onSimplify={onSimplify}
      />
    </>
  );
};

export default ElementContainer;

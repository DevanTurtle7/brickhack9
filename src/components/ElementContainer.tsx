import Element from '../model/Element';
import Operator from './Operator';
import ElementComponent from './ElementComponent';
import { Side } from '../model/Equation';
import { CombineItemsType } from './EquationComponent';

interface Props {
  element: Element;
  index: number;
  onSimplify: (index: number, side: Side) => void;
  combineItems: CombineItemsType;
}

const ElementContainer = ({ element, index, onSimplify, combineItems }: Props) => {
  return (
    <>
      {index !== 0 && <Operator symbol={element.positive ? 'plus' : 'minus'} />}
      <ElementComponent
        element={element}
        index={index}
        onSimplify={onSimplify}
        combineItems={combineItems}
      />
    </>
  );
};

export default ElementContainer;

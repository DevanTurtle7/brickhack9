import Element from '../model/Element';
import Operator from './Operator';
import ElementComponent from './ElementComponent';

interface Props {
  element: Element;
  index: number;
}

const ElementContainer = ({ element, index }: Props) => {
  return (
    <>
      {index !== 0 && <Operator symbol={element.positive ? 'plus' : 'minus'} />}
      <ElementComponent element={element} index={index} />
    </>
  );
};

export default ElementContainer;

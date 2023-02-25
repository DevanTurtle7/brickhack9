import Element from '../model/Element';
import { Side } from '../model/Equation';
import Operator from './Operator';
import VariableComponent from './VariableComponent';

interface Props {
  element: Element;
  index: number;
  side: Side;
}

const ElementContainer = ({ element, index, side }: Props) => {
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

  return (
    <>
      {!first && <Operator symbol={element.positive ? 'plus' : 'minus'} />}
      <VariableComponent value={value} index={index} side={side} />
    </>
  );
};

export default ElementContainer;

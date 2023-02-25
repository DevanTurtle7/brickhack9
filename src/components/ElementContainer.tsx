import Element from '../model/Element';
import Variable from '../model/Variable';
import Operator from './Operator';
import VariableComponent from './VariableComponent';

interface Props {
  element: Element;
  first: boolean;
}

const ElementContainer = ({element, first = false}: Props) => {
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
      <VariableComponent value={value} />
    </>
  );
};

export default ElementContainer;

import Variable from '../model/Variable';
import Operator from './Operator';
import VariableComponent from './VariableComponent';

interface Props {
  variable: Variable;
  first: boolean;
}

const VariableContainer = ({variable, first = false}: Props) => {
  const symbol = first && !variable.positive ? '-' : '';
  const value = variable.type === 'number' ? variable.value : variable.type;

  return (
    <>
      {!first && <Operator symbol={variable.positive ? 'plus' : 'minus'} />}
      <VariableComponent value={symbol + value} />
    </>
  );
};

export default VariableContainer;

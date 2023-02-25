import Variable from '../model/Variable';
import Operator from './Operator';
import VariableComponent from './VariableComponent';

interface Props {
  variable: Variable;
  first: boolean;
}

const VariableContainer = ({variable, first = false}: Props) => {
  return (
    <>
      {!first && <Operator symbol={variable.positive ? 'plus' : 'minus'} />}
      <VariableComponent
        value={variable.type === 'number' ? variable.value : variable.type}
      />
    </>
  );
};

export default VariableContainer;

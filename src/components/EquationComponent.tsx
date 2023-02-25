import Equation from '../model/Equation';
import Operator from './Operator';
import VariableContainer from './VariableContainer';

interface Props {
  equation: Equation;
}

const EquationComponent = ({equation}: Props) => {
  return (
    <div className='equation'>
      {equation.left.map((variable, index) => (
        <VariableContainer variable={variable} first={index === 0} />
      ))}
      <Operator symbol='equals' />
      {equation.right.map((variable, index) => (
        <VariableContainer variable={variable} first={index === 0} />
      ))}
    </div>
  );
};

export default EquationComponent;

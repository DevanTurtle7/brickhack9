import Equation from '../model/Equation';
import Operator from './Operator';
import VariableContainer from './VariableContainer';

interface Props {
  equation: Equation;
}

const EquationComponent = ({equation}: Props) => {
  return (
    <>
      <div className='left'>
        {equation.left.map((variable, index) => (
          <VariableContainer
            variable={variable}
            first={index === 0}
            key={variable.value + '-' + index}
          />
        ))}
      </div>
      <div className='middle'>
        <Operator symbol='equals' />
      </div>
      <div className='right'>
        {equation.right.map((variable, index) => (
          <VariableContainer
            variable={variable}
            first={index === 0}
            key={variable.value + '-' + index}
          />
        ))}
      </div>
    </>
  );
};

export default EquationComponent;

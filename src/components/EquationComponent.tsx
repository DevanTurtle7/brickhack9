import Equation from '../model/Equation';
import Operator from './Operator';
import ElementContainer from './ElementContainer';

interface Props {
  equation: Equation;
}

const EquationComponent = ({equation}: Props) => {
  return (
    <div className='equation'>
      <div className='left'>
        {equation.left.map((element, index) => (
          <ElementContainer element={element} first={index === 0} />
        ))}
      </div>
      <div className='middle'>
        <Operator symbol='equals' />
      </div>
      <div className='right'>
        {equation.right.map((element, index) => (
          <ElementContainer element={element} first={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default EquationComponent;

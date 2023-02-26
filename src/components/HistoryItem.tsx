import { Button } from '@mui/material';
import Element from '../model/Element';
import Equation from '../model/Equation';

interface Props {
  equation: Equation;
  onJumpTo: (equation: Equation) => void;
}

const HistoryItem = ({ equation, onJumpTo }: Props) => {
  const formatSide = (elements: Element[]) =>
    elements.map((element, index) => {
      const elements = element.variables.reduce(
        (acc, variable) => acc + variable.type,
        ''
      );

      const elementString =
        !element.isNumber() && element.constant.value === 1
          ? elements
          : element.constant.value + elements;

      if (index !== 0 || !element.positive) {
        return (element.positive ? ' + ' : ' - ') + elementString;
      } else {
        return elementString;
      }
    });

  const onClick = () => {
    onJumpTo(equation);
  };

  return (
    <div className="history-item">
      <p>
        {formatSide(equation.left)}
        {' = '}
        {formatSide(equation.right)}
      </p>
      <Button variant="text" onClick={onClick}>
        Jump To
      </Button>
    </div>
  );
};

export default HistoryItem;

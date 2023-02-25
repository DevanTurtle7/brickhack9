import Element from '../model/Element';
import Equation from '../model/Equation';

interface Props {
  equation: Equation;
}

const HistoryItem = ({equation}: Props) => {
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

  return (
    <p>
      {formatSide(equation.left)}
      {' = '}
      {formatSide(equation.right)}
    </p>
  );
};

export default HistoryItem;

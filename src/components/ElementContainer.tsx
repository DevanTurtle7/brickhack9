import Element from '../model/Element';
import Operator from './Operator';
import ElementComponent from './ElementComponent';
import { Side } from '../model/Equation';
import { CombineItemsType } from './EquationComponent';
import VariableComponent from './VariableComponent';
import ConstantComponent from './ConstantComponent';

interface Props {
  element: Element;
  index: number;
  first: boolean;
  onSimplify: (index: number, side: Side) => void;
  onSplitToggle: (index: number, side: Side) => void;
  combineItems: CombineItemsType;
}

const ElementContainer = ({
  element,
  index,
  first,
  onSimplify,
  onSplitToggle,
  combineItems,
}: Props) => {
  const onClick = () => {
    onSplitToggle(index, element.side);
  };

  let splitVariables = element.split
    ? element.variables.reduce(
        (acc, variable, variableIndex) => {
          acc.push(
            <VariableComponent
              index={index}
              variableIndex={variableIndex}
              element={element}
              key={`var-${element.getString()}-${variableIndex + 1}-${
                variable.type
              }`}
            />
          );

          if (variableIndex !== element.variables.length - 1) {
            acc.push(
              <Operator
                symbol="multiply"
                onClick={onClick}
                key={`mult-${element.getString()}-${variableIndex + 1}`}
              />
            );
          }

          return acc;
        },
        element.constant.value === 1
          ? []
          : [
              <ConstantComponent
                index={index}
                element={element}
                key={`var-${element.getString()}-0`}
              />,
              <Operator
                symbol="multiply"
                onClick={onClick}
                key={`mult-${element.getString()}-0`}
              />,
            ]
      )
    : undefined;

  if (splitVariables !== undefined && element.side === Side.Left) {
    splitVariables = splitVariables.reverse();
  }

  return (
    <>
      {!first && element.side === Side.Right && (
        <Operator symbol={element.positive ? 'plus' : 'minus'} />
      )}
      {element.split ? (
        splitVariables
      ) : (
        <ElementComponent
          element={element}
          index={index}
          first={first}
          onSimplify={onSimplify}
          onSplitToggle={onSplitToggle}
          combineItems={combineItems}
        />
      )}
      {!first && element.side === Side.Left && (
        <Operator symbol={element.positive ? 'plus' : 'minus'} />
      )}
    </>
  );
};

export default ElementContainer;

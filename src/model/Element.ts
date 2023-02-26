import Constant from './Constant';
import { Side } from './Equation';
import Variable from './Variable';

class Element {
  constant: Constant;
  positive: boolean;
  side: Side;
  variables: Variable[];
  denominator: number;

  constructor(
    constant: number,
    positive: boolean,
    side: Side,
    variables?: Variable[],
    denominator?: number
  ) {
    this.constant = new Constant(constant);
    this.positive = positive;
    this.side = side;

    if (variables) {
      this.variables = variables;
    } else {
      this.variables = [];
    }

    if (denominator !== undefined) {
      this.denominator = denominator;
    } else {
      this.denominator = 1;
    }
  }

  isNumber() {
    return this.variables.length === 0;
  }

  equalsType(other: Element) {
    if (other.variables.length !== this.variables.length) {
      return false;
    }

    this.variables.forEach((variable) => {
      if (!other.variables.includes(variable)) {
        return false;
      }
    });

    return true;
  }

  clone() {
    return new Element(
      this.constant.value,
      this.positive,
      this.side,
      this.variables
    );
  }

  getString() {
    return (
      this.constant.value.toString() +
      this.variables.reduce((acc, variable) => acc + variable.type, '')
    );
  }
}

export default Element;

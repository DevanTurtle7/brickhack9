import Constant from './Constant';
import Variable from './Variable';

class Element {
  constant: Constant;
  positive: boolean;
  variables: Variable[];

  constructor(constant: number, positive: boolean, variables?: Variable[]) {
    this.constant = new Constant(constant);
    this.positive = positive;

    if (variables) {
      this.variables = variables;
    } else {
      this.variables = [];
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
    return new Element(this.constant.value, this.positive, this.variables);
  }

  getString() {
    return (
      this.constant.value.toString() +
      this.variables.map((variable) => variable.type)
    );
  }
}

export default Element;

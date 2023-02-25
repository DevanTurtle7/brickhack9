import Element from './Element';

class Equation {
  left: Element[];
  right: Element[];
  prevState: Equation | null;
  nextState: Equation | null;

  constructor(left: Element[], right: Element[]) {
    this.left = left;
    this.right = right;
    this.prevState = null;
    this.nextState = null;
  }

  moveVariable(from: number, to: number, left: boolean) {
    const newEquation = this.getNextEquation();

    const equation = left ? newEquation.left : newEquation.right;
    const element = equation.splice(from, 1)[0];
    equation.splice(to, 0, element);

    if (equation.length === 0) {
      equation.push(new Element(0, true));
    }

    return newEquation;
  }

  moveVariableFromSide(fromIndex: number, fromLeft: boolean) {
    const newEquation = this.getNextEquation();

    const fromEquation = fromLeft ? newEquation.left : newEquation.right;
    const toEquation = fromLeft ? newEquation.right : newEquation.left;
    const element = fromEquation.splice(fromIndex, 1)[0];

    if (fromEquation.length === 0) {
      fromEquation.push(new Element(0, true));
    }

    // Change positivity when moving sides
    element.positive = !element.positive;

    toEquation.splice(toEquation.length, 0, element);

    return newEquation;
  }

  combine(index1: number, index2: number, left: boolean) {
    const newEquation = this.getNextEquation();

    const equation = left ? newEquation.left : newEquation.right;
    const element1 = equation[index1];
    const element2 = equation.splice(index2, 1)[0];

    if (!element1.equalsType(element2)) {
      throw new Error(
        `Cannot combine terms. Type ${element1.variables} does not match ${element2.variables}`
      );
    }

    if (index1 === index2) {
      throw new Error('Combination indices must be different');
    }

    element1.constant.value += element2.constant.value;

    return newEquation;
  }

  private getEquationStr = (equation: Element[]) =>
    equation.reduce((acc: string, element: Element, index: number) => {
      const first = index === 0;

      if (!first) {
        acc += ` ${element.positive ? '+' : '-'} `;
      }

      acc += element.getString();

      return acc;
    }, '');

  printEquation() {
    console.log(
      this.getEquationStr(this.left) + ' = ' + this.getEquationStr(this.right)
    );
  }

  clone() {
    const equationClone = new Equation(
      this.left.map((element) => element.clone()),
      this.right.map((element) => element.clone())
    );

    equationClone.nextState = this.nextState;
    equationClone.prevState = this.prevState;

    return equationClone;
  }

  private getNextEquation() {
    const newEquation = this.clone();
    newEquation.prevState = this;
    this.nextState = newEquation;

    return newEquation;
  }
}

export default Equation;

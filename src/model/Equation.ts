import Variable from './Variable';

class Equation {
  left: Variable[];
  right: Variable[];
  prevState: Equation | null;
  nextState: Equation | null;

  constructor(left: Variable[], right: Variable[]) {
    this.left = left;
    this.right = right;
    this.prevState = null;
    this.nextState = null;
  }

  moveVariable(from: number, to: number, left: boolean) {
    const newEquation = this.getNextEquation();

    const equation = left ? newEquation.left : newEquation.right;
    const variable = equation.splice(from, 1)[0];
    equation.splice(to, 0, variable);

    if (equation.length === 0) {
      equation.push(new Variable('number', true, 0));
    }

    return newEquation;
  }

  moveVariableFromSide(fromIndex: number, fromLeft: boolean) {
    const newEquation = this.getNextEquation();

    const fromEquation = fromLeft ? newEquation.left : newEquation.right;
    const toEquation = fromLeft ? newEquation.right : newEquation.left;
    const variable = fromEquation.splice(fromIndex, 1)[0];

    if (fromEquation.length === 0) {
      fromEquation.push(new Variable('number', true, 0));
    }

    // Change positivity when moving sides
    variable.positive = !variable.positive;

    toEquation.splice(toEquation.length, 0, variable);

    return newEquation;
  }

  private getEquationStr = (equation: Variable[]) =>
    equation.reduce((acc: string, variable: Variable, index: number) => {
      const first = index === 0;

      if (!first) {
        acc += ` ${variable.positive ? '+' : '-'} `;
      }

      acc += variable.type === 'number' ? variable.value : variable.type;

      return acc;
    }, '');

  printEquation() {
    console.log(
      this.getEquationStr(this.left) + ' = ' + this.getEquationStr(this.right)
    );
  }

  clone() {
    const equationClone = new Equation(
      this.left.map((variable) => variable.clone()),
      this.right.map((variable) => variable.clone())
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

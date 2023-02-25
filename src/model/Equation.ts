import Variable from './Variable';

class Equation {
  left: Variable[];
  right: Variable[];

  constructor(left: Variable[], right: Variable[]) {
    this.left = left;
    this.right = right;
  }

  moveVariableOnLeft(from: number, to: number) {
    this.moveVariable(from, to, true);
  }

  moveVariableOnRight(from: number, to: number) {
    this.moveVariable(from, to, false);
  }

  moveVariable(from: number, to: number, left: boolean) {
    const equation = left ? this.left : this.right;
    const variable = equation.splice(from, 1)[0];
    equation.splice(to, 0, variable);
  }

  moveVariableFromSide(fromIndex: number, fromLeft: boolean) {
    const fromEquation = fromLeft ? this.left : this.right;
    const toEquation = fromLeft ? this.right : this.left;
    const variable = fromEquation.splice(fromIndex, 1)[0];

    // Change positivity when moving sides
    variable.positive = !variable.positive;

    toEquation.splice(toEquation.length, 0, variable);
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
}

export default Equation;

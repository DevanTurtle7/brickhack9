import Variable from './Variable';

class Equation {
  left: Variable[];
  right: Variable[];
  history: Equation[];

  constructor(left: Variable[], right: Variable[]) {
    this.left = left;
    this.right = right;
    this.history = [];
  }

  private updateHistory() {
    this.history.push(this.clone());
  }

  moveVariable(from: number, to: number, left: boolean) {
    this.updateHistory();
    const equation = left ? this.left : this.right;
    const variable = equation.splice(from, 1)[0];
    equation.splice(to, 0, variable);
  }

  moveVariableFromSide(fromIndex: number, fromLeft: boolean) {
    this.updateHistory();
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

  clone() {
    const equationClone = new Equation(
      this.left.map((variable) => variable.clone()),
      this.right.map((variable) => variable.clone())
    );

    equationClone.history = this.history.map((equation) => equation);

    return equationClone;
  }
}

export default Equation;

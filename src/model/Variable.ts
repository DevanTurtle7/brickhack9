import { Side } from './Equation';

export interface VariableItem {
  index: number;
  side: Side;
}

class Variable {
  type: any;

  constructor(type: string) {
    this.type = type;
  }

  clone() {
    return new Variable(this.type);
  }
}

export default Variable;

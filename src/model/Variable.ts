import Element from './Element';

export interface VariableItem {
  index: number;
  element: Element;
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

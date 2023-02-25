class Variable {
  value?: number;
  type: any;
  positive: boolean;

  constructor(type: any, positive: boolean) {
    this.type = type;
    this.positive = positive;
  }
}

export default Variable;

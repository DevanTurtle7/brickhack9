class Variable {
  value?: number;
  type: any;
  positive: boolean;

  constructor(type: any, positive: boolean, value?: number) {
    this.type = type;
    this.positive = positive;
    if (value !== undefined) {
      this.value = value;
    }
  }

  clone() {
    return new Variable(this.type, this.positive, this.value);
  }
}

export default Variable;

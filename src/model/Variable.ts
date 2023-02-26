class Variable {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  clone() {
    return new Variable(this.type);
  }
}

export default Variable;

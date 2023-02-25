class Constant {
  value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Constant cannot be less than 0');
    }

    this.value = value;
  }

  clone() {
    return new Constant(this.value);
  }
}

export default Constant;

interface Props {
  symbol: 'plus' | 'minus' | 'equals';
}

const Operator = ({ symbol }: Props) => {
  const getSymbol = () => {
    if (symbol === 'plus') {
      return '+';
    } else if (symbol === 'minus') {
      return '-';
    } else if (symbol === 'equals') {
      return '=';
    }
  };

  return <p className="operator">{getSymbol()}</p>;
};

export default Operator;

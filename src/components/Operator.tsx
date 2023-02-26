interface Props {
  symbol: 'plus' | 'minus' | 'equals';
  onClick?: () => void;
}

const Operator = ({ symbol, onClick = () => {} }: Props) => {
  const getSymbol = () => {
    if (symbol === 'plus') {
      return '+';
    } else if (symbol === 'minus') {
      return '-';
    } else if (symbol === 'equals') {
      return '=';
    }
  };

  return (
    <p className={`operator operator-${symbol}`} onClick={onClick}>
      {getSymbol()}
    </p>
  );
};

export default Operator;

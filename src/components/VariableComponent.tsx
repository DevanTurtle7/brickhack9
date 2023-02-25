interface Props {
  value: string;
}

const VariableComponent = ({value}: Props) => {
  return <p className='variable'>{value}</p>;
};

export default VariableComponent;

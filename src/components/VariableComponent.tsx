import { useDrag } from "react-dnd";
import { DragTypes } from "../model/DragTypes";
import { Side } from "../model/Equation";

interface Props {
  value: string;
  index: number;
  side: Side;
}

const VariableComponent = ({ value, index, side }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.VARIABLE,
    item: { index, side },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <p className={`variable ${isDragging ? "dragging" : ""}`}>{value}</p>
    </div>
  );
};

export default VariableComponent;

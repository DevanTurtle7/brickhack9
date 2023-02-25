import { useDrop } from "react-dnd";
import { DragTypes } from "../model/DragTypes";
import { Side } from "../model/Equation";
import { VariableItem } from "../model/Variable";
import { MoveItemType } from "./EquationComponent";

interface Props {
  side: Side;
  moveItem: MoveItemType
}

const VariableAddDropZone = ({ side, moveItem }: Props) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DragTypes.VARIABLE,
    drop: (item: VariableItem) => moveItem(item),
    canDrop: (item: VariableItem) => item.side !== side,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop}>
      <p
        className={`variable drop-zone ${canDrop ? "can-drop" : ""} ${
          isOver ? "is-over" : ""
        }`}
      >
        ☐
      </p>
    </div>
  );
};

export default VariableAddDropZone;

import { Button, Modal } from '@mui/material';
import Equation from '../model/Equation';
import HistoryItem from './HistoryItem';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

const HistoryModal = ({
  modalOpen,
  onCloseModal,
  equation,
  setEquation,
}: Props) => {
  const onJumpTo = (equation: Equation) => {
    onCloseModal();
    setEquation(equation);
  };

  const getHistoryItems = () => {
    let current = equation;
    let currentIndex = 0;

    // Go to most recent state
    while (current.nextState !== null) {
      current = current.nextState;
      currentIndex += 1;
    }

    const items = [
      <HistoryItem
        equation={current}
        onJumpTo={onJumpTo}
        current={currentIndex === 0}
        key={equation.toString() + ':0'}
      />,
    ];

    let index = 1;

    while (current.prevState !== null) {
      current = current.prevState;
      items.push(
        <HistoryItem
          equation={current}
          onJumpTo={onJumpTo}
          current={currentIndex === index}
          key={equation.toString() + ':' + index}
        />
      );
      index++;
    }

    return items;
  };

  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className="modal">
        <div className="content">
          <h2>History</h2>
          <div className="history-items">{getHistoryItems()}</div>
        </div>
        <div className="footer">
          <Button variant="contained" onClick={onCloseModal}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;

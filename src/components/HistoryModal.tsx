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

    // Go to most recent state
    while (current.nextState !== null) {
      current = current.nextState;
    }

    const items = [
      <HistoryItem
        equation={current}
        onJumpTo={onJumpTo}
        key={equation.toString()}
      />,
    ];

    while (current.prevState !== null) {
      current = current.prevState;
      items.push(
        <HistoryItem
          equation={current}
          onJumpTo={onJumpTo}
          key={equation.toString()}
        />
      );
    }

    return items;
  };

  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className="history-modal">
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

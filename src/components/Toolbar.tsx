import { useState } from 'react';
import { MdUndo, MdRedo, MdHistory } from 'react-icons/md';
import Equation from '../model/Equation';
import HistoryModal from './HistoryModal';

interface Props {
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

const Toolbar = ({ equation, setEquation }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const undo = () => {
    if (equation.prevState) {
      setEquation(equation.prevState);
    }
  };

  const redo = () => {
    if (equation.nextState) {
      setEquation(equation.nextState);
    }
  };

  return (
    <>
      <HistoryModal
        modalOpen={modalOpen}
        onCloseModal={closeModal}
        equation={equation}
        setEquation={setEquation}
      />

      <div className="toolbar">
        <MdUndo
          onClick={undo}
          className={`icon-button icon-button-${
            equation.prevState !== null ? 'enabled' : 'disabled'
          }`}
        />
        <MdHistory
          onClick={openModal}
          className="icon-button icon-button-enabled"
        />
        <MdRedo
          onClick={redo}
          className={`icon-button icon-button-${
            equation.nextState !== null ? 'enabled' : 'disabled'
          }`}
        />
      </div>
    </>
  );
};

export default Toolbar;

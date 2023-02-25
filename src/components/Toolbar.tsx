import { useState } from 'react';
import { MdUndo, MdRedo, MdHistory } from 'react-icons/md';
import Equation from '../model/Equation';
import HistoryModal from './HistoryModal';

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  equation: Equation;
}

const Toolbar = ({ onUndo, onRedo, canUndo, canRedo, equation }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <HistoryModal
        modalOpen={modalOpen}
        onCloseModal={closeModal}
        equation={equation}
      />

      <div className="toolbar">
        <MdUndo
          onClick={onUndo}
          className={`icon-button icon-button-${
            canUndo ? 'enabled' : 'disabled'
          }`}
        />
        <MdHistory
          onClick={openModal}
          className="icon-button icon-button-enabled"
        />
        <MdRedo
          onClick={onRedo}
          className={`icon-button icon-button-${
            canRedo ? 'enabled' : 'disabled'
          }`}
        />
      </div>
    </>
  );
};

export default Toolbar;

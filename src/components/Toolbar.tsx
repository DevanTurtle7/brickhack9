import { useState } from 'react';
import {
  MdUndo,
  MdRedo,
  MdHistory,
  MdSettings,
  MdHelpOutline,
} from 'react-icons/md';
import Equation from '../model/Equation';
import HelpModal from './HelpModal';
import HistoryModal from './HistoryModal';
import SettingsModal from './SettingsModal';

interface Props {
  equation: Equation;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
  touchEnabled: boolean;
  setTouchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toolbar = ({
  equation,
  setEquation,
  touchEnabled,
  setTouchEnabled,
}: Props) => {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const openHistoryModal = () => {
    setHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setHistoryModalOpen(false);
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

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const openSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  const openHelpModal = () => {
    setHelpModalOpen(true);
  };

  return (
    <>
      <HistoryModal
        modalOpen={historyModalOpen}
        onCloseModal={closeHistoryModal}
        equation={equation}
        setEquation={setEquation}
      />

      <HelpModal modalOpen={helpModalOpen} onCloseModal={closeHelpModal} />

      <SettingsModal
        modalOpen={settingsModalOpen}
        onCloseModal={closeSettingsModal}
        touchEnabled={touchEnabled}
        setTouchEnabled={setTouchEnabled}
      />

      <div id="help-container">
        <MdHelpOutline className={'icon-button'} onClick={openHelpModal} />
      </div>

      <div className="toolbar">
        <MdUndo
          onClick={undo}
          className={`icon-button icon-button-${
            equation.prevState !== null ? 'enabled' : 'disabled'
          }`}
        />
        <MdHistory
          onClick={openHistoryModal}
          className="icon-button icon-button-enabled"
        />
        <MdRedo
          onClick={redo}
          className={`icon-button icon-button-${
            equation.nextState !== null ? 'enabled' : 'disabled'
          }`}
        />
      </div>

      <div id="settings-container">
        <MdSettings className={'icon-button'} onClick={openSettingsModal} />
      </div>
    </>
  );
};

export default Toolbar;

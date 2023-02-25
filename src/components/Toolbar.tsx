import { MdUndo, MdRedo, MdHistory } from 'react-icons/md';

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar = ({ onUndo, onRedo, canUndo, canRedo }: Props) => {
  return (
    <div className="toolbar">
      <MdUndo
        onClick={onUndo}
        className={`icon-button icon-button-${
          canUndo ? 'enabled' : 'disabled'
        }`}
      />
      <MdHistory className="icon-button" />
      <MdRedo
        onClick={onRedo}
        className={`icon-button icon-button-${
          canRedo ? 'enabled' : 'disabled'
        }`}
      />
    </div>
  );
};

export default Toolbar;

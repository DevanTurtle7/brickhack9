import {MdUndo, MdRedo, MdHistory} from 'react-icons/md';

interface Props {
  onUndo: () => void;
  onRedo: () => void;
}

const Toolbar = ({onUndo, onRedo}: Props) => {
  return (
    <div className='toolbar'>
      <MdUndo onClick={onUndo} />
      <MdHistory />
      <MdRedo onClick={onRedo} />
    </div>
  );
};

export default Toolbar;

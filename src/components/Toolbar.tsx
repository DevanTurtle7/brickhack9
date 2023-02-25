import {MdUndo, MdRedo, MdHistory} from 'react-icons/md';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <MdUndo />
      <MdHistory />
      <MdRedo />
    </div>
  );
};

export default Toolbar;

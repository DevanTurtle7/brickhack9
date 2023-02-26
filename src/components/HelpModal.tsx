import { Button, Modal } from '@mui/material';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
}

const HelpModal = ({ modalOpen, onCloseModal }: Props) => {
  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className="modal">
        <div className="content">
          <h2>Help</h2>
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

export default HelpModal;

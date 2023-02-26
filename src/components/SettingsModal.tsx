import { Button, Modal, Switch } from '@mui/material';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
  touchEnabled: boolean;
  setTouchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal = ({
  modalOpen,
  onCloseModal,
  touchEnabled,
  setTouchEnabled,
}: Props) => {
  const onChange = () => {
    setTouchEnabled((enabled) => !enabled);
  };

  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className="modal">
        <div className="content">
          <h2>Settings</h2>
          <p>
            <Switch checked={touchEnabled} onChange={onChange} />
            Touch controls
          </p>
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

export default SettingsModal;

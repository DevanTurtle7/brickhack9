import { Button, Modal, Switch } from '@mui/material';
import { useState } from 'react';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
  touchEnabled: boolean;
}

const SettingsModal = ({ modalOpen, onCloseModal, touchEnabled }: Props) => {
  const [on, setOn] = useState(touchEnabled);

  const onClose = () => {
    localStorage.setItem('touch', on ? 'true' : 'false');
    onCloseModal();
    window.location.reload();
  };

  const toggle = () => setOn((on) => !on);

  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className="modal">
        <div className="content">
          <h2>Settings</h2>
          <p>
            <Switch checked={on} onChange={toggle} />
            Touch controls
          </p>
        </div>
        <div className="footer">
          <Button variant="contained" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;

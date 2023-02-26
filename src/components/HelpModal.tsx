import { Button, Modal } from '@mui/material';
import Equation, { Side } from '../model/Equation';
import Variable from '../model/Variable';
import Element from '../model/Element';

interface Props {
  modalOpen: boolean;
  onCloseModal: () => void;
  setEquation: React.Dispatch<React.SetStateAction<Equation>>;
}

interface Sample {
  text: string;
  equation: Equation;
}

const buildEq1 = () => {
  const xVar = new Variable('x');
  const x = new Element(1, true, Side.Left, [xVar]);
  const xVar2 = new Variable('x');
  const x2 = new Element(2, false, Side.Left, [xVar2]);

  const six = new Element(6, true, Side.Left);
  const three = new Element(3, false, Side.Right);

  const left = [x2, six];
  const right = [three, x];

  return new Equation(left, right);
};

const buildEq2 = () => {
  const y = new Variable('y');
  const x = new Variable('x');
  const y2 = new Element(2, false, Side.Right, [y]);
  const nine = new Element(9, true, Side.Right);
  const x4 = new Element(4, false, Side.Left, [x]);
  const five = new Element(5, false, Side.Left);

  return new Equation([five, x4], [y2, nine]);
};

const samples: Sample[] = [
  {
    text: '6 + 2x = -3 - x',
    equation: buildEq1(),
  },
  {
    text: '2y - 9 = 4x + 5',
    equation: buildEq2(),
  },
];

const HelpModal = ({ modalOpen, onCloseModal, setEquation }: Props) => {
  return (
    <Modal open={modalOpen} disableAutoFocus={true}>
      <div className="modal">
        <div className="content">
          <h2>Help</h2>

          <h3>Sample Equations</h3>
          <div className="samples">
            {samples.map(({ text, equation }) => (
              <div className="sample-item">
                <p>{text}</p>
                <Button
                  variant="text"
                  onClick={() => {
                    setEquation(equation);
                    onCloseModal();
                  }}
                >
                  Try it
                </Button>
              </div>
            ))}
          </div>
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

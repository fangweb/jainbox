import ConfirmationDialog from './components/ConfirmationDialog';
import Warning from './components/Warning';
const initialState = null;

const MODAL_OPEN = 'modal/MODAL_OPEN';
const MODAL_CLOSE = 'modal/MODAL_CLOSE';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        modalKind: action.payload.kind,
        modalProps: action.payload.props
      };
    case MODAL_CLOSE:
      return null;
    default:
      return null;
  }
};

export const openModal = (kind, props) => ({
  type: MODAL_OPEN,
  payload: {
    kind,
    props
  }
});

export const closeModal = () => ({
  type: MODAL_CLOSE
});

export const modalComponents = {
  'CONFIRMATION_MODAL': ConfirmationDialog,
  'WARNING_MODAL': Warning
};




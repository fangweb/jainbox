const initialState = null;

const ACTIVATE_TOAST = 'toast/ACTIVATE_TOAST';
const END_TOAST = 'toast/END_TOAST';

export const TOAST_TRANSITION_DELAY = 50;
export const TOAST_DURATION = 5000;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_TOAST:
      return {
        toastType: action.payload.toastType,
        toastProps: {
          ...action.payload.props,
          duration: TOAST_DURATION,
          transitionDelay: TOAST_TRANSITION_DELAY
        }
      };
    case END_TOAST:
      return null;
    default:
      return state;
  }
};

export const activateToast = (toastType, props) => {
  return (dispatch, getState) => {
    dispatch({
      type: ACTIVATE_TOAST,
      payload: {
        toastType,
        props
      }
    });
  };
};

export const endToast = () => ({
  type: END_TOAST
});

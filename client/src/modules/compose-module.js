import { ServiceContainer } from '../services';
import { activateToast } from '../pkg/toast/toast-module';
import ComposeValidationError from '../lib/error/ComposeValidationError';

export const SET_FORM = 'compose/SET_FORM';
export const CLEAR_FORM = 'compose/CLEAR_FORM';
export const SENDING_FORM = 'compose/SEND_FORM';

const initialState = {
  form: {
    to: '',
    title: '',
    messageText: ''
  },
  sending: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM:
      return {
        form: {
          ...state.form,
          ...action.payload
        },
        sending: false
      };
    case CLEAR_FORM:
      return Object.assign({}, initialState);
    case SENDING_FORM:
      return {
        form: {
          ...state.form
        },
        sending: true
      };
    default:
      return state;
  }
};

export const setForm = data => {
  return {
    type: SET_FORM,
    payload: data
  };
};

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  };
};

const validateMessage = form => {
  if (!form.to || !form.title || !form.messageText) {
    throw new ComposeValidationError(
      'Please make sure all fields are completed'
    );
  }
  if (form.to === '' || form.title === '' || form.MessageText === '') {
    throw new ComposeValidationError(
      'Please make sure all fields are completed'
    );
  }
};

export const sendMessage = push => {
  return async (dispatch, getState) => {
    const api = ServiceContainer.api();
    const { composeReducer } = getState();
    const { form } = composeReducer;
    dispatch({ type: SENDING_FORM });
    try {
      validateMessage(form);
      const sent = await api.sendMessage({ ...form });
      dispatch(activateToast('success', { message: 'Message sent' }));
      push('/sent');
      dispatch({ type: CLEAR_FORM });
    } catch (e) {
      if (e.validationErrorMessage) {
        dispatch(activateToast('error', { message: e.validationErrorMessage }));
      } else {
        dispatch(activateToast('error', { message: 'Could not send message' }));
      }
      console.log(e);
    }
  };
};

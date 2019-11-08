import { ServiceContainer } from '../services';

export const SET_FORM = 'compose/SET_FORM';
export const CLEAR_FORM = 'compose/CLEAR_FORM';
export const SENDING_FORM = 'compose/SEND_FORM';

const initialState = {
  form: {
    to: null,
    title: '',
    message: ''
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

export const sendForm = () => {
  return async (dispatch, getState) => {
    const api = ServiceContainer.api();
    dispatch({ type: SENDING_FORM });
    const sent = await api.compose(getState().form);
    if (!sent) {
      // TODO: error sending form
    } else {
      dispatch({ type: CLEAR_FORM });
    }
  };
};

import { ServiceContainer } from '../services';

export const SET_FORM = 'compose/SET_FORM';
export const CLEAR_FORM = 'compose/CLEAR_FORM';
export const SENDING_FORM = 'compose/SEND_FORM';

const initialState = {
  form: {
    to: null,
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

export const sendMessage = () => {
  return async (dispatch, getState) => {
    const api = ServiceContainer.api();
    const { composeReducer } = getState();
    dispatch({ type: SENDING_FORM });
    try {
      const sent = await api.sendMessage({ ...composeReducer.form });
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: CLEAR_FORM });
  };
};
